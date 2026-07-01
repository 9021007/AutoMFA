// ==UserScript==
// @name         AutoMFA
// @namespace    https://login.microsoftonline.com/common/DeviceAuthTls/reprocess
// @version      2026-07-01
// @description  Clicks on Duo.
// @author       You
// @match        https://login.microsoftonline.com/common/DeviceAuthTls/reprocess
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-idle
// ==/UserScript==

//tysm https://stackoverflow.com/a/61511955
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

waitForElm("#idDiv_SAOTCS_Proofs_Section").then((mfaButtonContainer)=>{
  try {
    let duoButton = mfaButtonContainer.children[0].children[0].children[0];

    if (duoButton.innerText === "\t\nApprove with MFA (Duo)\nYou will be redirected to complete sign-in") {
      duoButton.click();
    }
  } catch (error) {
    console.error("issue clicking duo" + error);
  }
});