import requests
import sys
import json
from datetime import datetime

class OriiO1APITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_keys=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Status Code: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check response content
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                    
                    # Validate expected keys if provided
                    if expected_keys:
                        for key in expected_keys:
                            if key not in response_data:
                                print(f"⚠️  Warning: Expected key '{key}' not found in response")
                            else:
                                print(f"   ✓ Found expected key: {key}")
                    
                    return True, response_data
                except json.JSONDecodeError:
                    print(f"   Response Text: {response.text}")
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Error Text: {response.text}")
                return False, {}

        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection Error: Could not connect to {url}")
            print("   Make sure the backend server is running")
            return False, {}
        except requests.exceptions.Timeout:
            print(f"❌ Failed - Timeout: Request took too long")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200,
            expected_keys=["status", "model", "version"]
        )

    def test_model_info(self):
        """Test model info endpoint"""
        return self.run_test(
            "Model Info",
            "GET",
            "api/model-info",
            200,
            expected_keys=["name", "company", "version", "capabilities", "specifications"]
        )

    def test_contact_form(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company",
            "message": "This is a test message for the Orii-O1 contact form."
        }
        
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data,
            expected_keys=["status", "message"]
        )

    def test_demo_request(self):
        """Test demo request endpoint"""
        test_data = {
            "prompt": "What is artificial intelligence?",
            "max_tokens": 100
        }
        
        return self.run_test(
            "Demo Request",
            "POST",
            "api/demo",
            200,
            data=test_data,
            expected_keys=["model", "response", "tokens_used"]
        )

    def test_invalid_contact_form(self):
        """Test contact form with invalid data"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email",  # Invalid email format
            "message": "Test message"
        }
        
        return self.run_test(
            "Invalid Contact Form (Bad Email)",
            "POST",
            "api/contact",
            422,  # Expecting validation error
            data=test_data
        )

def main():
    print("🚀 Starting Orii-O1 Backend API Tests")
    print("=" * 50)
    
    # Initialize tester
    tester = OriiO1APITester()
    
    # Run all tests
    print("\n📋 Running API Tests...")
    
    # Test 1: Health Check
    tester.test_health_check()
    
    # Test 2: Model Info
    tester.test_model_info()
    
    # Test 3: Contact Form (Valid)
    tester.test_contact_form()
    
    # Test 4: Demo Request
    tester.test_demo_request()
    
    # Test 5: Invalid Contact Form
    tester.test_invalid_contact_form()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Test Results Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        return 0
    else:
        print(f"\n⚠️  {tester.tests_run - tester.tests_passed} test(s) failed. Please check the backend implementation.")
        return 1

if __name__ == "__main__":
    sys.exit(main())