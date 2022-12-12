import { getWalkers, getWalkerCities, getCities } from "./database.js"

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {

        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("walker")) {

            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const filteredAssignments = filterWalkerCitiesByWalker(walker);
                    const assignedCities = assignedCityNames(filteredAssignments);

                    window.alert(`${walker.name} services ${assignedCities}`)
                }
            }
        }
    }
)


const walkers = getWalkers()
const walkerCities = getWalkerCities();
const cities = getCities();

const filterWalkerCitiesByWalker = (walkerObj) => {
    const assignments = [];
    for(const assignment of walkerCities) {
        if(assignment.walkerId === walkerObj.id) {
            assignments.push(assignment);
        }
    }
    return assignments;
}

const assignedCityNames = (assignmentsArr) => {
    let cityNames = "";
    for(const assignment of assignmentsArr) {
        for(const city of cities) {
            if(city.id === assignment.cityId) {
                cityNames += ` -${city.name}`;
            }
        }
    }
    return cityNames;
}


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML;

}

