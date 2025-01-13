# Two-Factor Authentication (2FA) Guide

## **Overview**
This document describes the implementation of the Two-Factor Authentication (2FA) workflow in the backend and provides a guide for frontend developers on how to interact with the 2FA system.

### **Backend Implementation**
#### **Key Points**
1. **2FA Code Generation**:
   - A 6-digit random code is generated using the `generate_2fa_code` method in the `TwoFAService` class.
   - If code generation fails, the backend will return a `500 Internal Server Error`.

2. **2FA Code Storage**:
   - The code is stored in Redis with a Time-To-Live (TTL) using the `store_2fa_code` method.
   - Default TTL: `300` seconds.
   - The TTL can be overridden by passing an explicit value when calling the function.

3. **2FA Code Delivery**:
   - The code is sent to the user's registered email using the `send_2fa_code` method.
   - If the email sending fails, the backend will return a `500 Internal Server Error`.

4. **2FA Code Validation**:
   - When a user submits the 2FA code, the `validate_2fa_code` method checks if the code matches the stored value in Redis.
   - If valid, the backend deletes the code from Redis and proceeds with token generation.

5. **Token Generation**:
   - After successful validation, access and refresh tokens are generated and returned to the frontend.

---

### **Frontend Workflow Guide**

#### **1. User Login Without 2FA**
1. Send a `POST` request to `/auth/login/` with the user's `username` and `password`.
   - Example:
     ```json
     {
       "username": "john_doe",
       "password": "secure_password"
     }
     ```
2. Backend Response:
   - If login is successful and 2FA is not enabled:
     ```json
     {
       "refresh": "refresh_token",
       "access": "access_token",
       "user_id": 1,
       "nickname": "john_doe"
     }
     ```
   - If login fails:
     ```json
     {
       "error": "Invalid credentials"
     }
     ```

---

#### **2. Enable 2FA**
1. After logging in successfully, the user must update their profile to enable 2FA.
2. Send a `PUT` request to `/users/update-profile/` with the `twofa_enabled` flag and the user's `email`:
   - Example:
     ```json
     {
       "twofa_enabled": true,
       "email": "john_doe@example.com"
     }
     ```
3. Backend Response:
   - On success:
     ```json
     {
       "message": "2FA has been enabled successfully."
     }
     ```
   - On failure:
     ```json
     {
       "error": "Failed to update profile."
     }
     ```

---

#### **3. Logout**
1. Send a `POST` request to `/auth/logout/` with the `refresh_token`.
   - Example:
     ```json
     {
       "refresh_token": "refresh_token_value"
     }
     ```
2. Backend Response:
   - On success:
     ```json
     {
       "message": "Logged out successfully"
     }
     ```

---

#### **4. Login With 2FA Enabled**
1. Send a `POST` request to `/auth/login/` with the user's `username` and `password`.
   - Example:
     ```json
     {
       "username": "john_doe",
       "password": "secure_password"
     }
     ```
2. Backend Response:
   - If 2FA is enabled:
     ```json
     {
       "two_fa_required": true,
       "message": "A 2FA code has been sent to your email."
     }
     ```
   - If login fails:
     ```json
     {
       "error": "Invalid credentials"
     }
     ```
   - OR:
     ```json
     {
       "error": "No email found in the 'twofa_data'"
     }
     ```
   - OR:
     ```json
     {
       "error": "Failed to generate 2FA code. Please try again later."
     }
     ```
   - OR:
     ```json
     {
       "error": "Failed to store 2FA code. Please try again later."
     }
     ```
   - OR:
     ```json
     {
       "error": "Failed to send 2FA code. Please try again later."
     }
     ```

---

#### **5. Submit 2FA Code**
1. Prompt the user to input the 2FA code sent to their email.
2. Send a `POST` request to `/auth/validate-2fa/` with the `username` and `code`:
   - Example:
     ```json
     {
       "username": "john_doe",
       "code": "123456"
     }
     ```
3. Backend Response:
   - If the code is valid:
     ```json
     {
       "refresh": "refresh_token",
       "access": "access_token",
       "user_id": 1,
       "nickname": "john_doe"
     }
     ```
   - If the code is invalid or expired:
     ```json
     {
       "error": "Invalid or expired 2FA code."
     }
     ```

---

### **2FA Workflow Diagram**
```plaintext
1. User logs in:
   └── Backend checks credentials:
       └── If 2FA enabled:
           └── Send 2FA code to email.
               └── Frontend prompts for 2FA code.
2. User submits 2FA code:
   └── Backend validates code:
       └── If valid:
           └── Generate and return tokens.
       └── If invalid:
           └── Return error response.
