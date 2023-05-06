import axios from "axios";
import moment from "moment";

const url = "/api/posts";
class PostService {
  // Get Requests
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data)
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: moment(post.createdAt).format("lll"),
          }))
        );
      } catch (err) {
      reject(err.message)
      }
    });
  }

  static getDashBoard() {
    return new Promise(async (resolve, reject) => {
      try { 
        var token = localStorage.getItem("token");
        const res = await axios.get(`${url}/dashboard`,{
          headers: {
            Authorization: "Bearer " + token,
          },
        }
        );
        const data = res.data;
        // console.log(data);
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: moment(post.createdAt).format("lll"),
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  static getPostById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        var token = localStorage.getItem("token");
        const res = await axios.get(`${url}/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = res.data;
        data.createdAt = moment(data.createdAt).format("lll");
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  //Post Request
  static addPost(title, content) {
    try {
      var token = localStorage.getItem("token");
      return axios.post(
        url,
        {
          title,
          content
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  //Delete Request
  static deletePost(id) {
    try {
      var token = localStorage.getItem("token");
      return axios.delete(`${url}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  static updatePost(id, title, content) {
    try {
      var token = localStorage.getItem("token");
      return axios.put(
        `${url}/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
}
export default PostService;
