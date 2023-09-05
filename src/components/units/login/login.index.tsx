import React, { useState } from "react";
//  import ReactDOM from 'react-dom';

const Login: React.FC = () => {
  var redirect_uri = "http://localhost:5173/callback"; // change this your value

  const [client_id, setClientId] = useState("");
  const [client_secret, setClientSecret] = useState("");

  const AUTHORIZE = "https://accounts.spotify.com/authorize";

  function onPageLoad() {
    // 페이지 로딩 시 할 일
  }

  function requestAuthorization() {
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user
    console.log("성공!");

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url +=
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; //  Spotify의 권한 부여 화면 표시
  }

  return (
    <div className="container">
      <div id="tokenSection" className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="clientId" className="form-label">
              Client ID
            </label>
            <input
              type="text"
              className="form-control"
              id="clientId"
              placeholder=""
              value={client_id}
              onChange={(e) => setClientId(e.target.value)} // 값 변경 시 상태 업데이트
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientSecret" className="form-label">
              Client Secret
            </label>
            <input
              type="text"
              className="form-control"
              id="clientSecret"
              placeholder=""
              value={client_secret}
              onChange={(e) => setClientSecret(e.target.value)} // 값 변경 시 상태 업데이트
            />
          </div>
          <input
            className="btn btn-primary btn-lg"
            type="button"
            onClick={requestAuthorization}
            value="Request Authorization"
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Login;
