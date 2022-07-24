import client from "./client";

const endpoint = "/messages";

const sendListingMessage = (messageInfo) => {
    console.log(messageInfo);
    return client.post(endpoint, messageInfo);
}
console.log(sendListingMessage);

const getMessages = async (contactId) => client.get(`${endpoint}/${contactId}`);

export default { sendListingMessage, getMessages };
