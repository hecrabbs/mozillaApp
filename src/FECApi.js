import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Style.css';
import Collapse from "react-bootstrap/Collapse";
import Button from 'react-bootstrap/Button';

function fetchFECData(name) {

    //Make sure to handle all errors!!!!

    const key = `SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`

    let idArray;
    let mostRecentId;
    let committeeID;

    function fetchArrayOfIds(name) {
        const url = `https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=${key}`
        return (fetch(url)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()
            })
        )
    }

    function findMostRecentId(idArray) {
        const url = (id) => {
            return `https://api.open.fec.gov/v1/candidate/${id}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=${key}&sort_hide_null=false`
        }
        let urls = idArray.map(id => url(id));
        return (Promise.all(urls.map(url => fetch(url)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()
            })
        )))
    }

    function fetchMostRecentCommittee(mostRecentId) {
        const url = `https://api.open.fec.gov/v1/candidate/${mostRecentId}/committees/?sort=-last_file_date&sort_hide_null=false&committee_type=P&sort_nulls_last=false&per_page=20&sort_null_only=false&cycle=2020&page=1&api_key=${key}`
        return (fetch(url)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()
            })
        )
    }

    function fetchCandidateData(mostRecentId, committeeID) {
        const urls = [
            `https://api.open.fec.gov/v1/candidate/${mostRecentId}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=${key}&sort_hide_null=false`,
            `https://api.open.fec.gov/v1/candidate/${mostRecentId}/totals/?sort=-cycle&sort_nulls_last=true&sort_null_only=false&per_page=20&cycle=2020&election_full=false&page=1&api_key=${key}`,
            `https://api.open.fec.gov/v1/schedules/schedule_a/?is_individual=false&sort_hide_null=false&sort_null_only=false&sort=-contribution_receipt_amount&api_key=${key}&committee_id=${committeeID}&per_page=10`,
            `https://api.open.fec.gov/v1/schedules/schedule_a/?is_individual=true&sort_hide_null=false&sort_null_only=false&sort=-contribution_receipt_amount&api_key=${key}&committee_id=${committeeID}&per_page=10`,
        ]
        return (Promise.all(urls.map(url => fetch(url)
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()
            })
        )))
    }

    return fetchArrayOfIds(name)
        .then(json => {
            let results = json.results;
            if (results.length === 0) {
                throw Error("Invalid Entry");
            } else {
                idArray = results.map(result => result.id);
            }
            return findMostRecentId(idArray);
        }).then(json => {
            let activeThroughDates = json.map(object => object.results[0].active_through);
            let mostRecentDateIndex = activeThroughDates.indexOf(2020);
            mostRecentId = idArray[mostRecentDateIndex];
            return fetchMostRecentCommittee(mostRecentId);
        }).then(json => {
            if (json.results.length === 0) {
                throw Error("Not a Presidential Candidate");
            }
            committeeID = json.results[0].committee_id;

        }).then(() => {
            return fetchCandidateData(mostRecentId, committeeID);
        });
}

function FECResults(props) {

    const candidateInfo = props.data[0].results[0];
    const candidateTotals = props.data[1].results[0];
    const topContributions = props.data[2].results;
    const topIndividualContributions = props.data[3].results;

    const [openContributions, setOpenContributions] = useState(false);
    const [openIndivContributions, setOpenIndivContributions] = useState(false);

    return (
        <div className="Content">
            <b>{candidateInfo.party_full}</b> <br /> <br />
            <b>Candidate ID: </b>{candidateInfo.candidate_id} <br />
            <b>Active Through:</b> {candidateInfo.active_through} <br />
            <b>Address:</b> {candidateInfo.address_street_1} <br />
            <b>City:</b> {candidateInfo.address_city} <br />
            <b>State:</b> {candidateInfo.address_state} <br /><br />
            <b>Coverage Date:</b> {new Date(candidateTotals.coverage_start_date.replace(/-/g, '/').replace(/T.+/, '')).toDateString()} - {new Date(candidateTotals.coverage_end_date.replace(/-/g, '/').replace(/T.+/, '')).toDateString()}<br />
            <b>Disbursements:</b> ${candidateTotals.disbursements} <br />
            <b>Receipts:</b> ${candidateTotals.receipts} <br /><br />
            <b>Presidential Committee:</b> {topContributions[0].committee.name} <br /> <br />
            <Button onClick={() => setOpenContributions(!openContributions)}
                aria-controls="top-contributions"
                aria-expanded={openContributions}>
                <b>Top Contributions:</b>
            </Button>
            <Collapse in={openContributions}>
                <div id="top-contributions">
                    <br />{topContributions.map(contributor => (
                        <li key={contributor.sub_id}>{contributor.contributor_name}: ${contributor.contribution_receipt_amount}<br />{contributor.contributor_occupation}</li>
                    ))}
                </div>
            </Collapse>
            <br /> <br />
            <Button onClick={() => setOpenIndivContributions(!openIndivContributions)}
                aria-controls="top-individual-contributions"
                aria-expanded={openIndivContributions}>
                <b>Top Individual Contributions:</b>
            </Button>
            <Collapse in={openIndivContributions}>
                <div id="top-individual-contributions">
                    <br />{topIndividualContributions.map(contributor => (
                        <li key={contributor.sub_id}>{contributor.contributor_name}: ${contributor.contribution_receipt_amount}<br />{contributor.contributor_occupation}</li>
                    ))}
                </div>
            </Collapse>
            
        </div>
    )
}

export { fetchFECData };
export default FECResults;