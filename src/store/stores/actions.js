import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { ref, set, get, onChildAdded, onChildChanged,remove } from "firebase/database";
import { fAuth, fDb } from "boot/firebase";
import { useQuasar } from "quasar";
import { mapState } from "vuex";

const RegisterUser = async ({ commit }, payload) => {
  // console.log(payload);
  if (payload) {
    createUserWithEmailAndPassword(fAuth, payload.email, payload.password)
      .then((val) => {
        const UserID = val.user.uid;
        // console.log(val);
        const userref = ref(fDb, "users" + "/" + UserID);
        set(userref, {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        })
          .then(() => {
            console.log("User created");
            commit("userstore", {
              UserID,
              Data: {
                name: payload.name,
                email: payload.email,
                password: payload.password,
              },
            });
            // route.push("/dash");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
function LogUser({ commit }, payload) {
  console.log("LogUser");
  signInWithEmailAndPassword(fAuth, payload.email, payload.password).then(
    (response) => {
      // console.log(response);
      const getuserref = ref(fDb, "users" + "/" + response.user.uid);
      get(getuserref).then((snapshot) => {
        // console.log(snapshot.val());
        // console.log(snapshot.key);
        const userID = snapshot.key;
        commit("userstore", {
          UserID: snapshot.key,
          Data: {
            name: snapshot.val().name,
            email: snapshot.val().email,
            password: snapshot.val().password,
          },
        });
      });
      this.$router.push({ path: "/dash" });
    }
  );
}
function LogOut({ commit }) {
  signOut(fAuth).then(() => {
    console.log("logged out");
  });
  // commit("clearuser");
  this.$router.push({ path: "/auth" });
}
function HandleAuthenticationStateChange({ commit, dispatch }) {
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      // console.log(user);
      const getuserref = ref(fDb, "users" + "/" + user.uid);
      // console.log(getuserref);
      dispatch("getCourses");
      get(getuserref).then((snapshot) => {
        // console.log(snapshot.val());
        if (snapshot.val()) {
          commit("userstore", {
            name: snapshot.val().name,
            email: snapshot.val().email,
            password: snapshot.val().password,
          });
        }
        this.$router.push({ path: "/dash" });
      });
    } else {
      console.log("not logged in");
      commit("clearuser");
      this.$router.push({ path: "/auth" });
    }
  });
  // console.log("HandleAuthenticationStateChange");
}
function Updatecourses({ commit }, payload) {
  console.log(payload);
  const courseref = ref(fDb, "courses/" + payload.ID);
  // remove(courseref).then(()=>{
  //   console.log("Removed");
  // })
  set(courseref, {
    CourseName: payload.CourseName,
    Day: payload.Day,
    Lecturer: payload.Lecturer,
    StartTime: payload.StartTime,
    EndTime: payload.EndTime,
    link: payload.link,
  });
  
  console.log("Successfully Updated");
}
function getCourses({ commit }) {
  // console.log("Course Getting");
  const courseref = ref(fDb, "courses");
  onChildAdded(courseref, (snapshot) => {
    // console.log(element.val());
    const ID = snapshot.key;
    const Type = snapshot.val();
    commit("getcourse", {
      ID,
      Type,
    });
  });
  onChildChanged(courseref, (snapshot) => {
    const ID = snapshot.key;
    const Type = snapshot.val();
    commit("updatecourse", {
      ID,
      Type,
    });
  });
}
export {
  RegisterUser,
  LogUser,
  HandleAuthenticationStateChange,
  LogOut,
  getCourses,
  Updatecourses,
}