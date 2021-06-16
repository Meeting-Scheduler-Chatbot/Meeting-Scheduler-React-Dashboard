import axios from "axios";
const dotenv = require("dotenv");

dotenv.config();
const { DEBUG, SERVER_URL } = process.env;

let serverUrl = "http://127.0.0.1:8080";

if (DEBUG === 0) {
  serverUrl = SERVER_URL;
}

const our_api = {
  dummyRequest: async () => {
    try {
      return await axios.get("https://jsonplaceholder.typicode.com/posts");
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  dummyRequest2: async () => {
    try {
      return await axios.get("https://jsonplaceholder.typicode.com/posts");
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  // axios.post('/login', {
  //     firstName: 'Finn',
  //     lastName: 'Williams'
  // });

  SignUpRequest: async (email, password) => {
    try {
      return await axios({
        method: "post",
        url: serverUrl + "/auth/signup",

        data: {
          email: email,
          password: password,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }

    //     return await axios.post('http://localhost:8080/auth/signup', {
    //         email: 'demo3@gmail.com',
    //         password: 'demo1234'
    //     })
    // } catch (error) {
    //     console.error(error)
    // }
  },
  SignInRequest: async (email, password) => {
    try {
      return await axios({
        method: "post",
        url: serverUrl + "/auth/login",
        data: {
          email: email,
          password: password,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },
  getProfileRequest: async (token) => {
    console.log("Sending profile request...");
    try {
      return await axios({
        method: "get",
        url: serverUrl + "/api/user/profile",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },
  getMyGroups: async (token) => {
    try {
      return await axios({
        method: "get",
        url: serverUrl + "/api/group/my_groups",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },
  deleteGroup: async (token, id) => {
    try {
      return await axios({
        method: "delete",
        url: serverUrl + "/api/group",
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          id,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },
  addGroup: async (token, name) => {
    try {
      return await axios({
        method: "post",
        url: serverUrl + "/api/group",
        headers: {
          Authorization: "Bearer " + token,
        },

        data: {
          name: name,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },
  editGroup: async (token, id, name) => {
    try {
      return await axios({
        method: "put",
        url: serverUrl + "/api/group",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          name: name,
        },
        params: {
          id: id,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  getMembersOfMyCompany: async (token, groupId) => {
    console.log("REQUEST GROUP ID", groupId);
    try {
      return await axios({
        method: "post",
        url: serverUrl + "/api/company/members",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          groupId,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  getMembersOfGroup: async (token, groupId) => {
    try {
      return await axios({
        method: "post",
        url: serverUrl + "/api/group/members",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          groupId,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  allMembersNotBelongToAnyCompany: async (token) => {
    try {
      return await axios({
        method: "get",
        url: serverUrl + "/api/company/all_members_to_add_company",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  addMembersToMyCompany: async (token, memberList) => {
    try {
      return await axios({
        method: "post",
        url: serverUrl + "/api/company/add_members_to_company",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          memberList,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  addMembersToMyCompanyByCsv: async (token, file) => {
    try {
      console.log("FİLEEEEE", file);

      const formData = new FormData();
      formData.append("file", file);

      return await axios.post(
        serverUrl + "/api/company/add_members_to_company_by_csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
            //"Content-Disposition": "attachment; filename=simple.txt",
          },
        }
      );
    } catch (error) {
      throw error;
    }
  },

  deleteMemberOfGroup: async (token, memberId, groupId) => {
    console.log("MEMBERID:", memberId);
    console.log("GROUPID:", groupId);
    try {
      return await axios({
        method: "put",
        url: serverUrl + "/api/group/remove_member",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          memberId,
          groupId,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  addMemberListBulk: async (token, memberList, groupId) => {
    try {
      return await axios({
        method: "put",
        url: serverUrl + "/api/group/add_bulk_member",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          memberList,
          groupId,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  getUrlForGoogleButton: async (token) => {
    try {
      return await axios({
        method: "post",
        url: serverUrl + "/api/googleSecure/get_url",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          token: token,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },

  getCalendarEvents: async (token) => {
    try {
      return await axios({
        method: "post",
        url: serverUrl + "/api/googleSecure/schedule",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.error("There is a problem occured");
    }
  },
};
export default our_api;
