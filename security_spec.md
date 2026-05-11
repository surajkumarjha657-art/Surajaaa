# Security Specification: Triveni Terrace Cafe

## 1. Data Invariants
- A **Reservation** cannot be committed without a name, valid phone number, and a future date/time.
- A **Dish** must belong to a valid category (North Indian Snacks, Thalis, etc.) and have a positive price.
- **Admin access** is strictly controlled via an `/admins/{uid}` collection read check.
- **Gallery items** and **Dishes** are read-only for the public.

## 2. The Dirty Dozen Payloads (Red Team Tests)

### 1. Identity Spoofing (Dishes)
**Payload:** `{ "name": "Fake Dish", "price": 0, "category": "Thalis", "isAdmin": true }`
**Expected:** `PERMISSION_DENIED` - Only admins can write.

### 2. ID Poisoning (Reservations)
**Payload:** `reservations/very-long-id-that-is-over-128-characters-long...`
**Expected:** `PERMISSION_DENIED` - `isValidId()` check.

### 3. State Shortcutting (Reservations)
**Payload:** `{ "status": "accepted" }` created by a public user.
**Expected:** `PERMISSION_DENIED` - Only admins should be able to set status to 'accepted'.

### 4. Shadow Update (Settings)
**Payload:** `{ "value": { "about": "Hacked" }, "malicious_field": 123 }`
**Expected:** `PERMISSION_DENIED` - `isValidSettings()` should block shadow fields.

### 5. Orphaned Write (Reservations)
**Payload:** `{ "name": "Test", "date": "1990-01-01" }`
**Expected:** `PERMISSION_DENIED` - Should validate date formats or future dates (if logic allows).

### 6. PII Blanket Read (Reservations)
**Request:** `getDocs(collection(db, 'reservations'))` by non-admin.
**Expected:** `PERMISSION_DENIED` - Only admins can list reservations.

### 7. Self-Assigned Role (Admins)
**Payload:** `{ "role": "superadmin" }` to `/admins/{my_uid}` by a new user.
**Expected:** `PERMISSION_DENIED` - Admins collection is read-only for users (unless they are already admin). *Self-promotion via becomeAdmin button is only for dev and should be disabled in production rules.*

### 8. Resource Exhaustion (Reviews)
**Payload:** `{ "authorName": "A", "comment": "B".repeat(1000000) }`
**Expected:** `PERMISSION_DENIED` - Size limit on strings.

### 9. Type Mismatch (Dishes)
**Payload:** `{ "price": "100" }` (String instead of Number).
**Expected:** `PERMISSION_DENIED` - `is number` validation.

### 10. Query Scraping (Gallery)
**Request:** `query(collection(db, 'gallery'), where('secret', '==', true))`
**Expected:** `PERMISSION_DENIED` - If rules don't permit specific query patterns or indices.

### 11. Immortal Field Update (Orders - if added)
**Payload:** Changing `createdAt` on an existing document.
**Expected:** `PERMISSION_DENIED` - `incoming().createdAt == existing().createdAt`.

### 12. Unverified Email Access
**Request:** Accessing admin data with `email_verified: false` token.
**Expected:** `PERMISSION_DENIED` - Strict check on `email_verified`.

## 3. Consistency Report
| Collection | Identity Spoofing | State Shortcutting | Resource Poisoning |
|------------|-------------------|-------------------|--------------------|
| dishes     | Protected (Admin) | N/A               | Protected (Size)   |
| reservations| Protected (Admin) | Protected (Check) | Protected (Size)   |
| gallery    | Protected (Admin) | N/A               | Protected (Size)   |
| settings   | Protected (Admin) | Protected (Strict)| Protected (Size)   |
