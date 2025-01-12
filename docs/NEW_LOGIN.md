# Two-Factor Authentication Endpoints

## 1. Login Without 2FA
**Endpoint**: `POST /auth/login/`

**Request Body**:
```json
{
  "username": "john_doe",
  "password": "secure_password"
}
```
**Response (No 2FA Required):**
{
  "refresh": "refresh_token",
  "access": "access_token",
  "user_id": 1,
  "nickname": "john_doe"
}

## 2. Enable 2FA
**Endpoint**: `PUT /users/update-profile/`
**Request Body:**
```json
{
	"twofa_enabled": true,
  "email": "john_doe@example.com"
}
```

## 3. Logout

**Endpoint:** `POST /auth/logout/`

**Request Body:**
```json
{
  "refresh_token": "refresh_token_value"
}
```
## 4. Login With 2FA

**Endpoint:** `POST /auth/login/`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "secure_password"
}
```
**Response (2FA Required):**
```json
{
  "two_fa_required": true,
  "message": "A 2FA code has been sent to your email."
}
```

## 5. Submit 2FA Code

**Endpoint:** `POST /auth/validate-2fa/`

**Request Body:**
```json
{
  "username": "john_doe",
  "code": "123456"
}
```
**Response (Valid 2FA Code):**
```json
{
  "refresh": "refresh_token",
  "access": "access_token",
  "user_id": 1,
  "nickname": "john_doe"
}
```
**Response (Invalid 2FA Code):**
```json
{
  "error": "Invalid or expired 2FA code."
}
```
