import { useState } from "react";

function KirkkoAPI() {
  function getCalendars() {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    } as RequestInit;

    fetch("http://calapi.inadiutorium.cz/api/v0/en/calendars/default/2015/6/27", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const celebrations = result.celebrations.map((celebration: any) => <h2 style={{color: celebration.colour}}>{celebration.title}</h2>);
        setspecialdays(celebrations);
      })
      .catch((error) => console.error(error))
      setspecialdays('specialday');
  }

  const [specialdays, setspecialdays] = useState<string>("");
  if (specialdays.length != 0){
    return (
        <div>
            {specialdays}
        </div>
        );
  }
  return (
    <div>
      <button onClick={getCalendars}>Hae kalenterit</button>
    </div>
  );
}
export default KirkkoAPI;
