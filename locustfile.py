from locust import HttpUser, task, between, events
import random

# Global counters
login_counts = {"valid": 0, "invalid": 0, "bruteforce": 0}

class LoginUser(HttpUser):
    wait_time = between(1, 2)
    
    valid_email = "user@example.com"
    valid_password = "password123"

    invalid_credentials = [
        ("invalid@example.com", "wrongpass"),
        ("user@example.com", "wrongpass"),
        ("", "password123"),
        ("user@example.com", ""),
        ("<script>", "123"),
    ]

    @task(3)
    def valid_login(self):
        response = self.client.post(
            "/login",
            data={"email": self.valid_email, "password": self.valid_password},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            name="VALID_LOGIN"
        )
        login_counts["valid"] += 1

    @task(2)
    def invalid_login(self):
        email, password = random.choice(self.invalid_credentials)
        response = self.client.post(
            "/login",
            data={"email": email, "password": password},
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            name="INVALID_LOGIN"
        )
        login_counts["invalid"] += 1

    @task(1)
    def brute_force_login(self):
        for i in range(5):
            response = self.client.post(
                "/login",
                data={"email": f"attacker{i}@example.com", "password": f"badpass{i}"},
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                name="BRUTEFORCE_LOGIN"
            )
            login_counts["bruteforce"] += 1

# Print summary at the end
@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    print("\n\n====== Custom Login Attempt Report ======")
    print(f"✅ Valid logins attempted: {login_counts['valid']}")
    print(f"❌ Invalid logins attempted: {login_counts['invalid']}")
    print(f"🛑 Brute-force attempts:   {login_counts['bruteforce']}")
    print("=========================================\n")
