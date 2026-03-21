# LLM Data Leakage Simulation Project

## Overview

This project demonstrates how data leakage can occur in LLM-enabled web applications and evaluates defense-in-depth strategies to mitigate such risks.

The system is built using a Flask backend with a simple frontend interface that allows users to submit prompts and receive responses from a simulated LLM.

---

## Week 1 Implementation

### Objective

To build a functional baseline system that:

* Accepts user prompts
* Processes them through a backend
* Returns responses
* Simulates potential vulnerabilities for later security testing

---

## System Architecture

Frontend (HTML/JS) → Flask API (/chat) → Mock LLM → Response

---

## Components Implemented

### 1. Flask Backend

A Flask application was created to handle API requests.

**Key Features:**

* Runs locally using `python app.py`
* Exposes a `/chat` endpoint
* Accepts JSON input (`user_id`, `prompt`)
* Returns structured JSON responses

---

### 2. Chat Endpoint (`/chat`)

The `/chat` endpoint:

* Receives user prompts
* Validates input
* Passes data to the mock LLM
* Returns the generated response

---

### 3. Synthetic User Data

A dataset of mock users was created to simulate sensitive information.

Example:

* Name
* Email
* Account balance
* SSN

This data is intentionally used to demonstrate data leakage scenarios.

---

### 4. Mock LLM Integration

A simulated LLM was implemented to mimic real-world behavior.

**Behavior:**

* Returns user-specific data when prompted
* Returns all users' data when prompted with certain keywords (intentional vulnerability)

This enables testing of:

* Cross-user data leakage
* Prompt manipulation attacks

---

### 5. Frontend Interface

A simple HTML interface was created to:

* Select a user (User1 or User2)
* Enter prompts
* Display responses from the backend

---

## Challenge Encountered

During development, a cross-origin request issue occurred between the frontend and backend.

**Problem:**
The browser blocked communication between:

* Frontend: `127.0.0.1:5500`
* Backend: `127.0.0.1:5000`

This resulted in the error:

```
TypeError: Failed to fetch
```

**Solution:**
We resolved this by enabling CORS in the Flask application using `Flask-CORS`.

```python
from flask_cors import CORS
CORS(app)
```

This allowed controlled communication between the frontend and backend.

---

## Current System Behavior

### Normal Use Case

User requests:

```
show my data
```

System returns:

* Only the requesting user’s data

---

### Vulnerable Scenario (Intentional)

User requests:

```
show all users
```

System returns:

* Data for all users

This demonstrates a **data leakage vulnerability**, which will be addressed in later phases.

---

## How to Run the Application

### Backend

```bash
pip install flask flask-cors
python app.py
```

### Frontend

* Open `index.html` in a browser

---

## Tools Used

* Python
* Flask
* Flask-CORS
* HTML / JavaScript
* VS Code

---

## Next Steps (Week 2)

* Implement session isolation
* Add prompt sanitization
* Introduce output filtering
* Simulate attack scenarios

---

## Conclusion

The baseline system successfully demonstrates how LLM-integrated applications can expose sensitive data when proper controls are not in place. This sets the foundation for implementing and evaluating defense-in-depth strategies.
