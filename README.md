# Net Purpose frontend tech test 🎨

## Running the app
I have changed the initial create-react-app template to a TypeScript one but the app is run in the same way:
```
yarn && yarn start
```

## Included features

- ✅ Fetch portfolio getHoldings data from the included API
- ✅ Chart visualisation
    - A pie chart is included on the dashboard
    - It updates when holdings are added/removed/sorted
- ✅ Aggregate statistics
    - Total portfolio value is included on the dashboard
- ✅ Add holding on separate page
- ✅ Remove holding on separate page
    - Click anywhere on the row to access the 'Remove' page
- ✅ Sort the holdings
    - Click the table row header to sort by that column
    - There is a bug with reverse sorting (i.e. clicking on a heading twice) but I decided to use the time to focus on adding the requested features instead of resolving this.

## Things that I would have liked to implement
I did not have enough time to combine information from an external source however I spent time looking at the AlphaVantage API and had some thoughts on how it could be used:

- The 'overview' endpoint
    - https://www.alphavantage.co/query?function=OVERVIEW&symbol=XOM&apikey=qweqweqwe
    - The most straightforward application would be to include the description and other summary data within the detail page of the app. The high priority information might include market cap and P/E ratio.
    - The sector information could be used to group the holdings, which would be beneficial for users with many holdings. For example, an additional pie chart could be included on the dashboard showing total value per sector.

- The 'time series daily adjusted' endpoint
    - https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo
    - As suggested in the original README, this would be a useful endpoint from which to extract information on holding performance over time.

## Some comments on the judging criteria
### State management
I have included a redux-style reducer to manage application state. I've structured the reducers in such a way that it would be straightforward to include another reducer for the external API data. This could perhaps take the form of a `marketData` reducer. I wanted to include this style of state management architecture because I understand that the Net Purpose applications are structured in a similar way. You could argue that my chosen approach is overkill for a small example app but I hope it demonstrates my understanding.

You'll notice that I have included actions for failure states but I have not implemented them yet. In the interest of time, I chose to build the "happy path" but I am aware that things can go wrong when communicating with APIs (e.g. network errors, timeouts, unexpected responses). All of these problems should be communicated to the user somehow, which means that recording these failures in the application state is important.

For the form state in my submission, I wanted to demonstrate simple use of the `useState` hook. Having chosen that approach, I wanted to mention that larger projects that I work on often contain a form state management library and I recognise that there are certain cases where shared form state has advantages over component-level state (e.g. submitting a form from an overlay dialog that sits outside of the `<form>` element.

### Componentisation and project organisation
In order to help readability and reduce typing, I often use "action creator" functions instead of including the dispatchable actions in-line. These action creators are just functions that return an action. In my example app, I have included the actions in-line but, as the number and complexity of the actions grow, I can see action creators being beneficial.

Another feature that I would suggest including in future is selectors. Rather than drilling down the application state (e.g. `state.holdings.holdings.something.somethingElse`), a selector function could be used as a shorthand to traverse several nested properties of an object. I have worked on projects using selectors and have often found it helpful to compose selectors, or memoize them if they do more than simply access properties.

### Styling solutions
I have used styled-components and I understand that this is the approach currently used at Net Purpose. I have more in-depth experience than I was able to show in my submission, which includes composing components and conditional styles.

I am aware that there are a couple of styles in my submission that could be tidied up. I left these as-is in the interest of time, but I wanted to flag it because it does bother me :)

### Testing strategy
I often use test-driven development as my preferred way of working. Test-driving this project in the suggested time window would have been impossible but I have included some example jest tests to show my understanding of unit testing.

There are many other types of testing that I like to include in my projects, including acceptance and integration tests. I keep in mind the testing pyramid when deciding what aspects of the application to test with each method.

---

Thanks for reading. Please let me know your thoughts.
