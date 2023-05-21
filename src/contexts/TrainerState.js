import React from "react";
import TrainerContext from "./trainerContext";

const TrainerState = (props) => {
    const HOST = "https://smms-0wi6.onrender.com";

    const getFormatedDate = (date) => {
        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
      };

    // Count of the trainers
    const countOfTrainers = async () => {
        try{
            const response = await fetch(`${HOST}/api/trainer/count`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return data;
        }catch(err){
            console.error(err)
            return false;
        }
    }

    // Get the data of a individual trainer by bsgid and dob
    const getTrainerData = async (id,dob) => {
        try{
            const response = await fetch(`${HOST}/api/trainer/records/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "dob":dob,
                },
            });
            const data = await response.json();
            return data;
        }catch(err){
            console.error(err)
            return false;
        }
    }

    const getTrainers = async () => {
        try {
            const response = await fetch(`${HOST}/api/trainer/records`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
                },
            });
            const res = await response.json();
            return res;
        } catch (err) {
            return false;
            // showAlert("Error Fetching Trainer Data", "danger");
        }
    };

 
    const addTrainer = async (trainerData) => {
        try {
            const response = await fetch(
                `${HOST}/api/trainer/addTrainer`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                  },
                  body: JSON.stringify(trainerData),
                }
            );
            const res = await response.json();
            return res;
        } 
        catch (err) {
            return false;
            // showAlert("Error Fetching Trainer Data", "danger");
        }
    };

    const updateTrainer = async (trainerData,id) => {
        try {
            const response = await fetch(
              `${HOST}/api/trainer/records/${id}`,
              {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
                body: JSON.stringify(trainerData),
              }
            );
            const res = await response.json();
            return res;
        }
        catch (err) {
            return false;
            // showAlert("Error Fetching Trainer Data", "danger");
        }
    };
    
      const deleteTrainer = async (id) => {
        try {
            const response = await fetch(
                `${HOST}/api/trainer/records/${id}`,{
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    }
                }
            );
            const res = await response.json();
            return res;
        }
        catch (err) {
            return false;
            // showAlert("Error Fetching Trainer Data", "danger");
        }
    };

    
    return (
        <TrainerContext.Provider value={{getFormatedDate,countOfTrainers,getTrainerData,getTrainers,addTrainer,updateTrainer,deleteTrainer}}>
            {props.children}
        </TrainerContext.Provider>
    )
}

export default TrainerState