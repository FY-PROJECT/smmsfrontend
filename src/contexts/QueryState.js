import React from "react";
import QueryContext from "./queryContext";

const QueryState = (props) => {

    const HOST = "https://smms-0wi6.onrender.com";
    /**
        @param {Object} query - The query object to be sent to the backend
        @param {string} query.name - The name of the person sending the query
        @param {string} query.email - The email of the person sending the query
        @param {string} query.message - The message of the person sending the query
        @returns {Object} - Returns the response from the backend or false if error
        @description - Sends the query to the backend
    */
    const sendQuery = async (query) => { 
        try{
            const response = await fetch(`${HOST}/api/query/new`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(query),
              });
            const data = await response.json();
            return data;
        }catch(err){
            console.error(err);
            return false
        }
    }

    const sendReply = async (queryId,replyMessage) => {
        try{
            const response = await fetch(`${HOST}/api/query/reply`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    queryId,
                    replyMessage,
                }),
            });
            const data = await response.json();
            return data;
        }catch(err){
            console.error(err);
            return false
        }
    }


    const queryLogs = async () => {
        try{
            const response = await fetch(`${HOST}/api/query/logs`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem("token"),
                },
              });
            const data = await response.json();
            return data;
        }catch(err){
            console.error(err);
            return false
        }
    }

    const getAllQueries = async () => {
        try{
            const response = await fetch(`${HOST}/api/query/queries`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            return data;
        }catch(err){
            return false;
        }
    }

    return (
        <QueryContext.Provider value={{sendQuery,sendReply,queryLogs,getAllQueries}}>
            {props.children}
        </QueryContext.Provider>
    )
}

export default QueryState