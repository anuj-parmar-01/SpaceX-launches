export const baseUrl = 'https://api.spacexdata.com/v4/launches'

export const fetchLaunches = async (launchType ) => {
    let data = null;
    if(launchType === 'Upcoming Launch') data  = await fetch(baseUrl + '/upcoming')
     else data = await fetch(baseUrl )
     let res = await data.json()
     if(launchType==='Upcoming Launch')  return res
    
    return filterData(launchType, res)
  }

export const filterData = (type, launches ) => {
    if (type === 'Successful Launch') {
       return launches.filter((launch) => launch.success === true)
    }
    if(type==='All Launches') return launches
    if(type==='Failed Launches') return launches.filter((launch) => launch.success === false && launch.upcoming == false)
  }
  

export async function getPastLaunch() {
       let date = new Date()
       let SixMonthsBefore = date.setMonth(date.getMonth()-6);
       console.log(new Date().toISOString(), date.toISOString())
       let query = {
        "query": {
          "date_utc": {
            "$gte":date.toISOString(),
            "$lte": new Date().toISOString()
          }
       }
      }
      let data = await fetch(`https://api.spacexdata.com/v4/launches/query` , {
        method : "POST",
        body : JSON.stringify(query)
      });
      let res  = await data.json();
      return res.docs

}

export function capitalizeFirstLetter (str) {
  let capitalStr = str.split(' ')
  let firstPart = capitalStr[0][0].toUpperCase() + capitalStr[0].slice(1)
  let secondPart = capitalStr[1][0].toUpperCase() + capitalStr[1].slice(1)
  return `${firstPart} ${secondPart}`
}

