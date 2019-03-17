# sap-task

A task for a recruitment process for Junior Cloud Developer position at SAP.

# API endpoints

| endpoint                   | description                                                                      |
| -------------------------- | -------------------------------------------------------------------------------- |
| `/api/user`                | [Get all users](https://developer.github.com/v3/users/#get-all-users)            |
| `/api/user/:username`      | [Get single user](https://developer.github.com/v3/users/#get-a-single-user)      |
| `/api/user/:username/info` | [Get user summary](#user-summary)                                                |
| `/api/user/:username/repo` | [List user repos](https://developer.github.com/v3/repos/#list-your-repositories) |

### User summary

Get overall information about given user. <br>
**Response**

```json
{
  "login": "expigo",
  "email": "🥔",
  "reposListOfNames": {
    "floyd-warshall": "https://api.github.com/repos/expigo/floyd-warshall",
    "form-builder": "https://api.github.com/repos/expigo/form-builder",
    "hash_tables": "https://api.github.com/repos/expigo/hash_tables",
    "jsf-primefaces": "https://api.github.com/repos/expigo/jsf-primefaces",
    "LZSS": "https://api.github.com/repos/expigo/LZSS",
    "monument-inventory-app": "https://api.github.com/repos/expigo/monument-inventory-app",
    "sap-task": "https://api.github.com/repos/expigo/sap-task",
    "servlet-jsp-jpa-crud": "https://api.github.com/repos/expigo/servlet-jsp-jpa-crud",
    "spring-pet-clinic-breakdown": "https://api.github.com/repos/expigo/spring-pet-clinic-breakdown",
    "Winter": "https://api.github.com/repos/expigo/Winter"
  },
  "langStats": {
    "C++": "2.55",
    "JavaScript": "14.90",
    "CSS": "34.09",
    "HTML": "14.30",
    "Java": "34.15"
  }
}
```

| key              | value                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| login            | user's login                                                                                   |
| email            | user's email (potato if not provided)                                                          |
| reposListOfNames | An object containing key-value pairs in format { full_name: url }                              |
| langStats        | A global statistics on used programming languages in user's repos; format: { lang: share in %} |
