Feature: Validation of regres.in web service

    Scenario: Retrieve multiple users of a page and verify response parameter
        Given user performs get operation to retrieve multiple users
            | email                  | firstname | lastname | avatar                                  | statuscode | uri              |
            | george.bluth@reqres.in | George    | Bluth    | https://reqres.in/img/faces/1-image.jpg | 200        | api/users?page=1 |
            | janet.weaver@reqres.in | Janet     | Weaver   | https://reqres.in/img/faces/2-image.jpg | 200        | api/users?page=1 |

    Scenario: Retrieve single user users and verify response parameter
        Given user performs get operation to retrieve a single user
            | email               | firstname | lastname | avatar                                  | statuscode | uri         |
            | emma.wong@reqres.in | Emma      | Wong     | https://reqres.in/img/faces/3-image.jpg | 200        | api/users/3 |


    Scenario: Verify creation of a new user using POST operation
        Given user performs post operation to create a user
            | payload                                    | statuscode | uri       |
            | {"name": "QA Test1","job": "QA Engineer1"} | 201        | api/users |
            | {"name": "QA Test2","job": "QA Engineer2"} | 201        | api/users |

    Scenario: Verify update user api functionality using PUT operation
        Given user performs put operation to update a user
            | payload                                                    | statuscode | uri         |
            | {"name": "QA Test1 Updated","job": "QA Engineer1 Updated"} | 200        | api/users/4 |

    Scenario: Verify update user api functionality using PATCH operation
        Given user performs patch operation to update a user
            | payload                                                    | statuscode | uri         |
            | {"name": "QA Test1 Updated","job": "QA Engineer1 Updated"} | 200        | api/users/5 |

    Scenario: Verify delete user api functionality using DELETE operation
        Given user performs delete operation to delete a user
            | statuscode | uri         |
            | 204        | api/users/5 |

    Scenario: Verify get operation using fixture
        Given user performs get operation and verify data from fixture