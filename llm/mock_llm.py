from data.users import users

def generate_response(prompt, user_id):
    prompt = prompt.lower()

    # Normal behavior
    if "my data" in prompt:
        return users.get(user_id, "User not found")

    # Simulated vulnerability (VERY IMPORTANT for your project later)
    if "all users" in prompt or "everyone" in prompt:
        return users

    # Default response
    return f"Echo: {prompt}"