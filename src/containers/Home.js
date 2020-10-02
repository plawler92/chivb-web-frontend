import React, { useEffect, useState } from "react";
import { PageHeader, Table } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";

export default function Home() {
    const [leagues, setLeagues] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            try {
                const leagues = await loadLeagues();
                setLeagues(leagues);
            } catch (e) {
                console.log(e)
            }

            setIsLoading(false);
        }

        onLoad();
    }, []);

    function loadLeagues() {
        return API.get("ChiVB-Web", "/leagues")
    }
    
    function renderLeaguesTableRows(leagues) {
        console.log(leagues)
        return leagues.map((league, i) =>
          <tr>
              <td>{league.league}</td>
              <td>{league.skill}</td>
              <td>{league.gender}</td>
              <td>{league.fmt}</td>
              <td>{league.day}</td>
              <td>{league.time}</td>
              <td>{league.startdate}</td>
              <td>{league.surface}</td>
              <td>{league.teamprice}/{league.soloprice}</td>
              <td><a href={`league.leagueurl`}>Link</a></td>
          </tr>  
        );
    }

    function renderLeaguesTable() {
        return (
            <div className="leagues">
                <PageHeader>Leagues</PageHeader>
                <Table>
                    <tr>
                        <td>League</td>
                        <td>Skill</td>
                        <td>Gender</td>
                        <td>Format</td>
                        <td>Day</td>
                        <td>Time</td>
                        <td>Start Date</td>
                        <td>Surface</td>
                        <td>Price Team/Individual</td>
                        <td>League Page</td>
                    </tr>
                    {!isLoading && renderLeaguesTableRows(leagues)}
                </Table>
            </div>
        )
    }

    return (
        <div className="Home">
            { renderLeaguesTable() }
        </div>
    );
}