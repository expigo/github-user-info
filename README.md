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

| key              | value                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| login            | user's login                                                                                    |
| email            | user's email (potato if not provided)                                                           |
| reposListOfNames | An object containing key-value pairs in format { full_name: url }                               |
| langStats        | A global statistics on used programming languages in user's repos; format: { lang: share in % } |

<hr>

## Design choices

- choosing tech stack I went for Express.js, because every other choice looked like an overkill to me
- instead of wrapping every `await` call in try/catch statement, I decided to wrap every controller that makes such a call around a higher-order function that has only one purpose: to intercept potential Promise rejection and pass the resulting error down to the error handling middleware: <br>

```javascript
export const catchErrors = controller => (req, res, next) =>
  controller(req, res, next).catch(next)
```

> I belive it decouples the business logic from error handling code and nicely follows the Separation of Concerns concepts.

- at some point I realised that common DAO code could be extracted providing some reusability. That's how `getOne, getAll` and `findBy` methods got refactored out. This way, adding a new resource will just be a matter of implementing code that fetches the resource from any data structure (responsibility of the model), and the controller will be generated 'metaprogramatically' by calling `createDaoFor` method. Having this in place, the code can be easily expanded to provide the rest of the REST functionality.
- every file that has been used throughout the development process is checked out to github (except for .env)
