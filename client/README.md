# Development Rule

- Use styled-components for styling.
- All strings should be in ./languageProvider/locales/ko.json.
- A table component should have pagination functionality.
- Send PR to "client/master" branch after finish the functionality.

## Chart Component(BarChart, LineChart)

* **BarChart** - BarChart component which is extened from rechart

* **LineChart** - LineChart component which is extended from rechart

### Demo
[**Live Demo**](https://admin-charts.netlify.com/)

### Include the Component

```js
import React from 'react'
import AdminBarChart from '~/../components/chartComponents/AdminBarChart';

class Component extends React.Component {

  render() {
    return ( 
      <AdminBarChart 
        data={barData} 
        idealPlan={5000}
      />
    )
  }
}
```
### Required Props

- data
> object
 const barData = [
      { name: "Jan", Group1: 4000, Group2: 2400, Group3: 2400, Group4: 2400 },
      { name: "Feb", Group1: 3000, Group2: 1398, Group3: 2210, Group4: 2210 },
 ]
- idealPlan(optional)
  > number

 LinChart are nearly same, and you can check live demo and it will be useful.

 ### dependency
 > "recharts": "^1.4.1"

 > This component uses `randomColorGenerator` function which is in `Helper` folder

 ### Warning
 if you don't specify width, and height of the parent component, it could not be displayed.