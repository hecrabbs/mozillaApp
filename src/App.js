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
  // isBrowser,
  // isMobile
} from "react-device-detect";

import { searchArticles } from "./NewsApi";
import NewsResults from "./NewsApi";
import { fetchFECData } from "./FECApi";
import FECResults from "./FECApi";
// import TwitterContainer from "./TwitterConainer";
import './Style.css';

function App() {



  const [firstCandidateData, setFirstCandidateData] = useState([]);
  const [firstNewsResults, setFirstNewsResults] = useState([]);
  const [firstSubmitted, setFirstSubmitted] = useState(false);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [firstError, setFirstError] = useState({ message: "NO ERROR", exists: false });

  const [secondCandidateData, setSecondCandidateData] = useState([]);
  const [secondNewsResults, setSecondNewsResults] = useState([]);
  const [secondSubmitted, setSecondSubmitted] = useState(false);
  const [secondLoaded, setSecondLoaded] = useState(false);
  const [secondError, setSecondError] = useState({ message: "NO ERROR", exists: false });

  function SearchBar(props) {
    const [input, setInput] = useState({});

    const handleInputChange = (e) => setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })

    const handleSubmit = (e) => {
      e.preventDefault();

      if (e.currentTarget.firstCandidateName.value !== "") {
        setFirstLoaded(false);
        setFirstSubmitted(true);
        setFirstError(firstError => ({ ...firstError, exists: false }));
        searchArticles(e.currentTarget.firstCandidateName.value).then(response => {
          setFirstNewsResults(response.articles)
        });
        fetchFECData(e.currentTarget.firstCandidateName.value).then(response => {
          setFirstCandidateData(response);
          setFirstLoaded(true);
        }).catch(e => {
          console.log(e);
          setFirstError(firstError => ({ message: e.toString(), exists: true }));
        });
      }

      if (e.currentTarget.secondCandidateName.value !== "") {
        setSecondLoaded(false);
        setSecondSubmitted(true);
        setSecondError(secondError => ({ ...secondError, exists: false }));
        searchArticles(e.currentTarget.secondCandidateName.value).then(response => {
          setSecondNewsResults(response.articles)
        });
        fetchFECData(e.currentTarget.secondCandidateName.value).then(response => {
          setSecondCandidateData(response);
          setSecondLoaded(true);
        }).catch(e => {
          console.log(e);
          setSecondError(secondError => ({ message: e.toString(), exists: true }));
        });
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

  function FirstTabResults(props) {
    if (firstSubmitted) {
      if (firstError.exists) {
        return (
          <div className="Content">{firstError.message} <br />
            <ul>
              <li>Make sure the name entered is a presidential candidate</li>
              <li>Try using the candidate's full name</li>
              <li>Double check the name was spelled correctly</li>
            </ul>
          </div>
        )
      } else if (firstLoaded) {
        return (
          <div> <FECResults data={firstCandidateData} /> <br />
            <NewsResults results={firstNewsResults} /></div>
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
      if (secondError.exists) {
        return (
          <div className="Content">{secondError.message}</div>
        )
      } else if (secondLoaded) {
        return (
          <div> <FECResults data={secondCandidateData} /> <br />
            <NewsResults results={secondNewsResults} /></div>
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
                <img alt="Logo" src={require("./JuxtaPollsLogo512.png")} width="50" height="50" /> {' '}
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
                  return firstCandidateData[0].results[0].name;
                } else {
                  return "First Candidate:";
                }
              })()}</h3>
              <FirstTabResults /></Col>
            <Col md={6} xs={6} className="verticalLineLeft">
              <h3 className="BrowserTabs">{(() => {
                if (secondLoaded) {
                  return secondCandidateData[0].results[0].name;
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
                <img alt="Logo" src={require("./JuxtaPollsLogo512.png")} width="50" height="50" /> {' '}
                <strong className="Title"><span style={{ color: 'blue' }}>JUXTA</span><span style={{ color: 'red' }}>POLLS</span></strong>
              </Row>
              <Row ><span>QUICKLY SEARCH AND COMPARE <b><i>THE FACTS</i></b> BETWEEN POLITICAL CANDIDATES</span>
              </Row>
            </Col>
            <Col sm={12} md={{ size: 10, offset: 1 }} ><SearchBar /></Col>
          </Row>
        </Container>
        <Container fluid>
          <Row ><Col sm={12} md={{ size: 11, offset: 1 }}>
            <Tabs defaultActiveKey="firstCandidate" className="StickyTabs" >
              <Tab eventKey="firstCandidate" title={(() => {
                if (firstLoaded) {
                  return <b>{firstCandidateData[0].results[0].name}</b>;
                } else {
                  return "First Candidate";
                }
              })()}>
                <FirstTabResults />
              </Tab>
              <Tab eventKey="secondCandidate" title={(() => {
                if (secondLoaded) {
                  return <b>{secondCandidateData[0].results[0].name}</b>;
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
            <Col sm="12" md={1}></Col>
          </Row>
        </Container>
      </MobileView>
    </div>
  );
}

export default App;