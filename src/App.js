import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

import { searchArticles } from "./NewsApi";
import NewsResults from "./NewsApi";
import TwitterContainer from "./TwitterConainer";
import './Style.css';

function App() {

  const [firstSubmitted, setFirstSubmitted] = useState(false);
  const [firstCandidate, setFirstCandidate] = useState({});
  const [firstCandidateTotals, setFirstCandidateTotals] = useState([]);
  const [firstCandidateCommittee, setFirstCandidateCommittee] = useState([]);
  const [firstCandidateTopContributions, setFirstCandidateTopContributions] = useState([]);
  const [firstCandidateTopIndividualContributions, setFirstCandidateTopIndividualContributions] = useState([]);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [firstNewsResults, setFirstNewsResults] = useState([]);

  const [secondSubmitted, setSecondSubmitted] = useState(false);
  const [secondCandidate, setSecondCandidate] = useState([]);
  const [secondCandidateTotals, setSecondCandidateTotals] = useState([]);
  const [secondCandidateCommittee, setSecondCandidateCommittee] = useState([]);
  const [secondCandidateTopContributions, setSecondCandidateTopContributions] = useState([]);
  const [secondCandidateTopIndividualContributions, setSecondCandidateTopIndividualContributions] = useState([]);
  const [secondLoaded, setSecondLoaded] = useState(false);
  const [secondNewsResults, setSecondNewsResults] = useState([]);

  function FetchArrayOfIds(name, number) {
    const url = `https://api.open.fec.gov/v1/names/candidates/?q=${name}&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        handleJSON(json);
      })
      .catch((e) => {
        console.log(e);
      });

    const handleJSON = (json) => {
      let results = json.results;
      if (results.length === 0) {
        throw Error("Invalid Entry");
      } else {
        let idArray = results.map(result => result.id);
        FindMostRecentId(idArray, number);
      }
    }
  }

  function FindMostRecentId(idArray, number) {
    const url = (id) => {
      return `https://api.open.fec.gov/v1/candidate/${id}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false`
    }
    let urls = idArray.map(id => url(id));
    Promise.all(urls.map(url => fetch(url)
      .then(r => r.json())
    ))
      .then((json) => {
        handleJSON(json);
      })

    const handleJSON = (json) => {
      let activeThroughDates = json.map(object => object.results[0].active_through);
      let mostRecentDateIndex = activeThroughDates.indexOf(2020);
      let mostRecentId = idArray[mostRecentDateIndex];
      FetchCandidate(mostRecentId, number);
      FetchCandidateTotals(mostRecentId, number);
      FetchCommittees(mostRecentId, number);
    }
  }

  function FetchCandidate(mostRecentId, number) {
    const url = `https://api.open.fec.gov/v1/candidate/${mostRecentId}/?sort_nulls_last=false&sort_null_only=false&per_page=20&page=1&sort=name&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&sort_hide_null=false`
    fetch(url)
      .then(r => r.json())
      .then(json => {
        if (number === 1) {
          setFirstCandidate(json.results[0]);
        } else if (number === 2) {
          setSecondCandidate(json.results[0]);
        }
      });
  }

  function FetchCandidateTotals(mostRecentId, number) {
    const url = `https://api.open.fec.gov/v1/candidate/${mostRecentId}/totals/?sort=-cycle&sort_nulls_last=true&sort_null_only=false&per_page=20&cycle=2020&election_full=false&page=1&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`;
    fetch(url)
      .then(r => r.json())
      .then(json => {
        if (number === 1) {
          setFirstCandidateTotals(json.results[0]);
        } else if (number === 2) {
          setSecondCandidateTotals(json.results[0]);
        }
      });
  }

  function FetchCommittees(mostRecentId, number) {
    const url = `https://api.open.fec.gov/v1/candidate/${mostRecentId}/committees/?sort=-last_file_date&sort_hide_null=false&committee_type=P&sort_nulls_last=false&per_page=20&sort_null_only=false&cycle=2020&page=1&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp`
    fetch(url)
      .then(r => r.json())
      .then(json => {
        handleJSON(json);
      });

    const handleJSON = (json) => {
      if (number === 1) {
        setFirstCandidateCommittee(json.results[0]);
      } else if (number === 2) {
        setSecondCandidateCommittee(json.results[0]);
      }
      let committeeID = json.results[0].committee_id;
      FetchTopContributions(committeeID, number);
      FetchTopIndividualContributions(committeeID, number);
    }
  }

  function FetchTopContributions(committeeID, number) {
    const url = `https://api.open.fec.gov/v1/schedules/schedule_a/?is_individual=false&sort_hide_null=false&sort_null_only=false&sort=-contribution_receipt_amount&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&committee_id=${committeeID}&per_page=10`;
    fetch(url)
      .then(r => r.json())
      .then(json => {
        if (number === 1) {
          setFirstCandidateTopContributions(json.results);
        } else if (number === 2) {
          setSecondCandidateTopContributions(json.results);
        }
      })
  }

  function FetchTopIndividualContributions(committeeID, number) {
    const url = `https://api.open.fec.gov/v1/schedules/schedule_a/?is_individual=true&sort_hide_null=false&sort_null_only=false&sort=-contribution_receipt_amount&api_key=SVuK6wlixoKEc7Ccdd7X2paVLHTAjGjJUZdlzAMp&committee_id=${committeeID}&per_page=10`;
    fetch(url)
      .then(r => r.json())
      .then(json => {
        if (number === 1) {
          setFirstCandidateTopIndividualContributions(json.results);
          setFirstLoaded(true);
        } else if (number === 2) {
          setSecondCandidateTopIndividualContributions(json.results);
          setSecondLoaded(true);
        }
      })
  }

  function SearchBar() {
    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      if (e.currentTarget.firstCandidateName.value !== "") {
        setFirstLoaded(false);
        FetchArrayOfIds(e.currentTarget.firstCandidateName.value, 1);
        searchArticles(e.currentTarget.firstCandidateName.value).then(response => {
          setFirstNewsResults(response.articles)
        });
        setFirstSubmitted(true);
      }
      if (e.currentTarget.secondCandidateName.value !== "") {
        setSecondLoaded(false);
        FetchArrayOfIds(e.currentTarget.secondCandidateName.value, 2);
        searchArticles(e.currentTarget.secondCandidateName.value).then(response => {
          setSecondNewsResults(response.articles)
        });
        setSecondSubmitted(true);
      }
    }

    return (
      <Form onSubmit={handleSubmit} >
        <Form.Row>
          <Col xs={6} sm={6} md={6}>
            <Form.Group controlId="firstCandidate" className="Form">
              <Form.Control type="text" name="firstCandidateName" placeholder="First Candidate Name" onChange={handleInputChange} />
            </Form.Group></Col>
          <Col xs={6} sm={6} md={6}>
            <Form.Group controlId="secondCandidate" className="Form">
              <Form.Control type="text" name="secondCandidateName" placeholder="Second Candidate Name" onChange={handleInputChange} />
            </Form.Group></Col>
        </Form.Row>
        <Form.Row>
          <Col><Button type="submit" className="Button" block>Submit</Button></Col></Form.Row>
      </Form>
    )
  }

  //new Date ("2019-01-01T00:00:00+00:00".replace(/-/g, '\/').replace(/T.+/, '')).toDateString();

  function FirstTabResults(props) {
    if (firstSubmitted) {
      if (firstLoaded) {
        return (
          <div className="Content">
            <b>{firstCandidate.party_full}</b> <br /> <br />
            <b>Candidate ID: </b>{firstCandidate.candidate_id} <br />
            <b>Active Through:</b> {firstCandidate.active_through} <br />
            <b>Address:</b> {firstCandidate.address_street_1} <br />
            <b>City:</b> {firstCandidate.address_city} <br />
            <b>State:</b> {firstCandidate.address_state} <br /><br />
            <b>Date:</b> {firstCandidateTotals.coverage_start_date}---{firstCandidateTotals.coverage_end_date}<br />
            <b>Disbursements:</b> ${firstCandidateTotals.disbursements} <br />
            <b>Receipts:</b> ${firstCandidateTotals.receipts} <br /><br />
            <b>Presidential Committee:</b> {firstCandidateCommittee.name} <br /> <br />
            <b>Top Contributions:</b> <br /> <br />
            {firstCandidateTopContributions.map(contributor => (
              <li key={contributor.sub_id}>{contributor.contributor_name}: ${contributor.contribution_receipt_amount}<br />{contributor.contributor_occupation}</li>
            ))} <br /> <br />
            <b>Top Individual Contributions:</b> <br /> <br />
            {firstCandidateTopIndividualContributions.map(contributor => (
              <li key={contributor.sub_id}>{contributor.contributor_name}: ${contributor.contribution_receipt_amount}<br />{contributor.contributor_occupation}</li>
            ))} <br /> <br />
            <b>News:</b> <br /><br />
            <NewsResults results={firstNewsResults} />
          </div>
        )
      } else {
        return (
          <div>LOADING...</div>
        )
      }
    } else {
      return (
        <div className="Content" style={{ textAlign: 'center' }}>Search For a Candidate Above.</div>
      )
    }
  }

  function SecondTabResults(props) {
    if (secondSubmitted) {
      if (secondLoaded) {
        return (
          <div className="Content">
            <b>{secondCandidate.party_full}</b> <br /> <br />
            <b>Candidate ID: </b>{secondCandidate.candidate_id} <br />
            <b>Active Through:</b> {secondCandidate.active_through} <br />
            <b>Address:</b> {secondCandidate.address_street_1} <br />
            <b>City:</b> {secondCandidate.address_city} <br />
            <b>State:</b> {secondCandidate.address_state} <br /> <br />
            <b>Date:</b> {secondCandidateTotals.coverage_start_date}---{secondCandidateTotals.coverage_end_date}<br />
            <b>Disbursements:</b> ${secondCandidateTotals.disbursements} <br />
            <b>Receipts:</b> ${secondCandidateTotals.receipts} <br /> <br />
            <b>Presidential Committee:</b> {secondCandidateCommittee.name} <br /> <br />
            <b>Top Contributions:</b> <br /> <br />
            {secondCandidateTopContributions.map(contributor => (
              <li key={contributor.sub_id}>{contributor.contributor_name}: ${contributor.contribution_receipt_amount}<br />{contributor.contributor_occupation}</li>
            ))} <br /> <br />
            <b>Top Individual Contributions:</b> <br /> <br />
            {secondCandidateTopIndividualContributions.map(contributor => (
              <li key={contributor.sub_id}>{contributor.contributor_name}: ${contributor.contribution_receipt_amount}<br />{contributor.contributor_occupation}</li>
            ))}<br /> <br />
            <b>News:</b> <br /><br />
            <NewsResults results={secondNewsResults} />
          </div>
        )
      } else {
        return (
          <div>LOADING...</div>
        )
      }
    } else {
      return (
        <div className="Content" style={{ textAlign: 'center' }}>Search For a Candidate Above.</div>
      )
    }
  }

  return (
    <div className="App">
      <BrowserView>
        <Container fluid className="Header" >
          <Row>
            <Col sm={12} md={6} className="CenterVertically">
              <Row >
                <img alt="Logo" src={require("../public/JuxtaPollsLogo512.png")} width="50" height="50" /> {' '}
                <strong className="Title"><span style={{ color: 'blue' }}>JUXTA</span><span style={{ color: 'red' }}>POLLS</span></strong>
              </Row>
              <Row ><span>QUICKLY SEARCH AND COMPARE <b><i>THE FACTS</i></b> BETWEEN POLITICAL CANDIDATES</span>
              </Row>
            </Col>
            <Col sm={12} md={{ size: 5, offset: 1 }} ><SearchBar /></Col>
          </Row>
        </Container>
        <Container fluid>
          <Row >
            <Col md={6} xs={6} className="verticalLineRight">
              <h3 className="BrowserTabs">{(() => {
                if (firstLoaded) {
                  return firstCandidate.name;
                } else {
                  return "First Candidate:";
                }
              })()}</h3>
              <FirstTabResults /></Col>
            <Col md={6} xs={6} className="verticalLineLeft">
              <h3 className="BrowserTabs">{(() => {
                if (secondLoaded) {
                  return secondCandidate.name;
                } else {
                  return "Second Candidate:";
                }
              })()}</h3>
              <SecondTabResults /></Col>

          </Row>
        </Container>
      </BrowserView>

      <MobileView>
        <Container fluid className="Header" >
          <Row>
            <Col sm={12} md={6} className="CenterVertically">
              <Row >
                <img alt="Logo" src={require("../public/JuxtaPollsLogo512.png")} width="50" height="50" /> {' '}
                <strong className="Title"><span style={{ color: 'blue' }}>JUXTA</span><span style={{ color: 'red' }}>POLLS</span></strong>
              </Row>
              <Row ><span>QUICKLY SEARCH AND COMPARE <b><i>THE FACTS</i></b> BETWEEN POLITICAL CANDIDATES</span>
              </Row>
            </Col>
            <Col sm={12} md={{ size: 5, offset: 1 }} ><SearchBar /></Col>
          </Row>
        </Container>
        <Container fluid>
          <Row ><Col sm={12} md={{ size: 6, offset: 3 }}>
            <Tabs defaultActiveKey="firstCandidate" className="StickyTabs" >
              <Tab eventKey="firstCandidate" title={(() => {
                if (firstLoaded) {
                  return <b>{secondCandidate.name}</b>;
                } else {
                  return "First Candidate";
                }
              })()}>
                <FirstTabResults />
              </Tab>
              <Tab eventKey="secondCandidate" title={(() => {
                if (secondLoaded) {
                  return <b>{firstCandidate.name}</b>;
                } else {
                  return "Second Candidate";
                }
              })()}>
                <SecondTabResults />
              </Tab>
              {/* <Tab eventKey="twitter" title="Twitter Test">
                    <TwitterContainer />
                  </Tab> */}
            </Tabs>
          </Col>
            <Col sm="12" md={3}></Col>
          </Row>
        </Container>
      </MobileView>
    </div>
  );
}

export default App;