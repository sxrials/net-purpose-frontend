# Net Purpose frontend tech test 🎨

## What is the task?

Your task is to create a frontend "admin dashboard" for some fictional portfolio holdings. Portfolio details will be delivered via the API (see below). We don't expect you to spend more than a couple hours on this, and there is no need to worry about updating the backend folder.

We want to see three things: integration with APIs, display of data, and user interaction.

### 1. Integration with API

We'd like to see you fetch portfolio holdings data from the included API (see below for details), and ideally combine information from an external source like [AlphaVantage](https://www.alphavantage.co/).

### 2. Display data

Show the data retrieved from the API(s) on the page. Bonus points for creative visualisations and ideas (we like charts 📊)

Mandatory feature set:

- List of holdings

Some ideas to extend if you have time:

- Aggregate statistics on holdings, e.g. total portfolio value
- Holdings performance over time - [link](https://www.alphavantage.co/documentation/#time-series-data)

### 3. User interaction

An example of the user interacting with the page, e.g. using buttons, sliders, dropdowns etc.

Mandatory feature set:

- Add and remove a holding (ideally on a separate page)
- Sort the displayed list of holdings (e.g. by name and value)

Some ideas to extend this part (feel free to come up with something more interesting):

- Login flow
- Update a holding
- Search and filter the data that's displayed

### Summary

So, you should end up with an app that:

- Grabs holdings data from the local API
- Displays that on the page, with options to sort by name or value
- On a separate page, allows you to add and remove a holding

Plus whatever extensions you have time for!

## Judging criteria

We're going to look mostly at the structure and quality of your code, rather than how beautiful your solution looks. That being said, some appreciation of UX and interaction design principles are important.

We're also interested to hear your thoughts on, or see your implementation for, things like:

- State management
- Componentisation and project organisation
- Styling solutions
- Testing strategy

## The boilerplate

### Frontend

In the `frontend` directory, is an almost unmodified create-react-app project to help you get started quickly. If you prefer, please feel free to use your own boilerplate (and linting rules 😉).

If you like TypeScript, [go for it](https://create-react-app.dev/docs/adding-typescript/). We also accept solutions using Vue.

There is an example request to the API in `App.js`.

### API

Check out the swagger at [http://localhost/docs](http://localhost/docs). (See "How to get it running" below first)

The API consists of three main endpoints: `/login`, `/users`, and `/holdings`:

- `/login` - POST username and password, get back a JWT to use as Bearer auth with the other endpoints
- `/users` - CRUD user management
- `/holdings` - CRUD holdings - e.g. `GET /holdings` will return a list of your holdings

You can login using these credentials to start with, it's up to you if you want to make your app multitenant:

- user: admin@frontend.com
- password: changethis

> ⚠️ The holdings for this user will reset whenever the backend is restarted

### Database

Open a psql session with `docker-compose exec db bash`, then `psql -d app -U postgres`. Alternatively, you can inspect using pgAdmin - [http://localhost:5050](http://localhost:5050/)

Mainly we are interested in the `holding` table:

```
 id  |                name                | ticker | value | owner_id
-----+------------------------------------+--------+-------+----------
 694 | APPLE INC                          | AAPL   | 82345 |        1
 695 | MICROSOFT CORP                     | MSFT   | 12727 |        1
```

- Name: name of the company
- Ticker: short code identifying the company, you can use this e.g. to look up data through AlphaVantage
- Value: the 'amount' of stock held in that company, you can imagine this is in e.g. USD
- Owner ID: foreign key to users table

## How to get it running

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)

### Start the app

```
# in the backend directory
docker-compose up -d

# in the frontend directory
yarn && yarn start
```

Now go to [http://localhost:3000](http://localhost:3000) and you should see the app.

Happy coding! ⌨️ 🖥 📊 🎨 ✨
