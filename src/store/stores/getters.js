const courses=(state)=>{
    let Todaycourses ={}
    // console.log(state.courses);
    Object.keys(state.courses).forEach(key=>{
        // console.log(key,value);
        if(state.courses[key].Day=="Monday"){
            // console.log("Detected",key);
            Todaycourses[key]=state.courses[key]
        }
        
    })
    // console.log(Todaycourses);
    return Todaycourses
    // return state.courses

}
const AllcoursesID=(state)=>{
    let AllCourses=[]
    Object.keys(state.courses).forEach(key=>{
        AllCourses.push(key)
    })
    console.log(AllCourses);
    return AllCourses
}
export {courses,AllcoursesID}