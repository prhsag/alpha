const TestReportData= "
{
    "tests": {
        "mojom_tests": {
            "parse": {
                "ast_unittest": {
                    "ASTTest": {
                        "testNodeBase": {
                            "expected": "PASS",
                            "actual": "PASS",
                            "artifacts": {
                                "screenshot": ["screenshots/page.png"],
                            }
                        }
                    }
                }
            }
        }
    },
    "interrupted": false,
    "path_delimiter": ".",
    "version": 3,
    "seconds_since_epoch": 1406662283.764424,
    "num_failures_by_type": {
        "FAIL": 0,
        "PASS": 1
    },
    "artifact_types": {
        "screenshot": "image/png"
    }
}
"


const TestReportData2 = JSON.parse({
    {
        "test_suite_name": "My Application Test Suite",
        "test_date": "2023-10-27T14:30:00",
        "test_environment": "Production Environment",
        "test_cases": [
          {
            "test_case_name": "Login Test",
            "status": "Pass",
            "duration": "0:02:35",
            "error_message": null
          },
          {
            "test_case_name": "User Registration Test",
            "status": "Pass",
            "duration": "0:03:10",
            "error_message": null
          },
          {
            "test_case_name": "Search Functionality Test",
            "status": "Fail",
            "duration": "0:04:45",
            "error_message": "Search results not displaying correctly."
          },
          {
            "test_case_name": "Add to Cart Test",
            "status": "Pass",
            "duration": "0:01:50",
            "error_message": null
          }
        },
        "test_summary": {
          "total_tests": 4,
          "passed_tests": 3,
          "failed_tests": 1,
          "start_time": "2023-10-27T14:30:00",
          "end_time": "2023-10-27T14:42:30"
        }
      }
      
})