

# Function 1

[SpaceX API](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launchpads/v4/one.md).

This function accepts an `id` of a `launchpad` as an argument, and returns information about failed `launches` (desc) in following format:

```js
// launchpad id 5e9e4502f5090995de566f86
{
   "launchpad":"Kwajalein Atoll",
   "all_failures":[
      {
         "name":"Trailblazer",
         "failures":[
            "residual stage-1 thrust led to collision between stage 1 and stage 2"
         ]
      },
      {
         "name":"DemoSat",
         "failures":[
            "harmonic oscillation leading to premature engine shutdown"
         ]
      },
      {
         "name":"FalconSat",
         "failures":[
            "merlin engine failure"
         ]
      }
   ]
}
```
Try to only retrieve and process launches for the given `launchpad`


# Function 2

Fetch all starlink satellites using [this query](https://github.com/r-spacex/SpaceX-API/blob/master/docs/starlink/v4/all.md) and store the response in (runtime) memory.

Afterwards, write a function that transforms this response data.

The return value of this function should make it possible to look up all starlink satellites launched on a specific `year`, `month`, and/or `date` in a performant way.

Make it as convenient as possible to look up following values from the return value:

- starlinks launched in year 2019
- starlinks launched on May 5th 2019
- starlinks launched in June 2020