import React, { useEffect, useState } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
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

    function renderLeaguesList(leagues) { 
        console.log(leagues)       
        return (
            <ListGroupItem>
                <h4>{leagues.key1}</h4>
                <h4>{leagues.key2}</h4>
                <h4>{leagues.key3}</h4>
            </ListGroupItem>
        );
    }

    function renderLeagues() {
        return (
            <div className="leagues">
                <PageHeader>Leagues1</PageHeader>
                <ListGroup>
                    {!isLoading && renderLeaguesList(leagues)}
                </ListGroup>
            </div>
        );        
    }

    return (
        <div className="Home">
            {renderLeagues()}
        </div>
    );
}