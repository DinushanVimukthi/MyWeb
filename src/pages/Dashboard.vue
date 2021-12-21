<template>
  <div>
    <q-splitter v-model="splitterModel" style="height: auto">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="Lectures" icon="library_books" label="Lectures" />
          <q-tab name="Admin" icon="library_books" label="Admin Board" />
          <q-tab disable name="alarms" icon="alarm" label="Alarms" />
          <q-tab disable name="movies" icon="movie" label="Movies" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="Lectures">
            <div class="text-h4 q-ma-md">Lectures</div>
            <div class="flex flex-center">
              <q-card
                dark
                bordered
                class="bg-grey-9 my-card q-pa-md q-ma-lg"
                v-for="(courses,ID) in courses"
                :key="ID"
              >
                <q-card-section>
                  <div class="text-h4 mydiv">
                    {{ courses.CourseName }}
                    <div class="text-h6">{{ courses.Lecturer }}</div>
                  </div>
                  <div class="text-h6 mydiv">Time:- {{ courses.StartTime }} - {{ courses.EndTime }}</div>
                  <div class="mydiv">
                    <q-btn
                      label="Join Now "
                      type="a"
                      :href="courses.link"
                      target="_blank"
                      color="red"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <!--<q-tab-panel name="Admin">
            <div>Admin</div>
            <div>Today Lectures</div>
            
            <div class="flex flex-center">
              <q-card class="my-card2 q-pa-md q-ma-lg" @click="Adddialog = true">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  <div class="absolute-bottom text-subtitle2 text-center">Add New Course</div>
                  <q-tooltip
                    class="bg-indigo text-body2"
                    :offset="[10, 10]"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >Add new Course</q-tooltip>
                </q-img>
              </q-card>
              <q-card class="my-card2 q-pa-md q-ma-lg" @click="Editdialog = true">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  <div class="absolute-bottom text-subtitle2 text-center">Edit Course</div>
                  <q-tooltip>Edit a Course</q-tooltip>
                </q-img>
              </q-card>
            </div>
            <q-btn label="Add new Course" color="primary" @click="Adddialog = true" />
            <q-btn label="Update Course" color="primary" @click="Editdialog = true" />

            <div class="q-pa-md q-gutter-sm">
              <q-dialog
                v-model="Editdialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="slide-up"
                transition-hide="slide-down"
              >
                <q-card class="bg-secondary text-white DialogBox">
                  <q-bar>
                    <q-space />

                    <q-btn
                      dense
                      flat
                      icon="minimize"
                      @click="maximizedToggle = false"
                      :disable="!maximizedToggle"
                    >
                      <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      icon="crop_square"
                      @click="maximizedToggle = true"
                      :disable="maximizedToggle"
                    >
                      <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup @click="ClearAll">
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>

                  <q-card-section>
                    <div class="text-h6">Edit Course</div>
                  </q-card-section>
                
                <q-card-section class="q-pt-none text-white">
                    <q-form>
                      <q-select v-model="model" :options="AllcoursesID" label="All Courses" />
                      <span>
                        Course Name :
                        <q-input
                          filled
                          v-model="tmpCourseName"
                          :placeholder="courses[model].CourseName"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecturer Name:
                        <q-input
                          filled
                          v-model="tmpLecturer"
                          :placeholder="courses[model].Lecturer"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture Day:
                        <q-input
                          filled
                          v-model="tmpDay"
                          :placeholder="courses[model].tmpDay"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture Start Time:
                        <q-input
                          filled
                          v-model="tmpStartTime"
                          :placeholder="courses[model].StartTime"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture End Time:
                        <q-input
                          filled
                          v-model="tmpEndTime"
                          :placeholder="courses[model].EndTime"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture Link:
                        <q-input
                          filled
                          v-model="tmplink"
                          :placeholder="courses[model].link"
                          :dense="dense"
                        />
                      </span>
                      <q-btn label="Update Course" @click="UpdateCourse" />
                    </q-form>
                  </q-card-section>
                </q-card>
              <q-dialog
                v-model="Adddialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="slide-up"
                transition-hide="slide-down"
              >
                <q-card class="bg-secondary text-white DialogBox">
                  <q-bar>
                    <q-space />

                    <q-btn
                      dense
                      flat
                      icon="minimize"
                      @click="maximizedToggle = false"
                      :disable="!maximizedToggle"
                    >
                      <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      icon="crop_square"
                      @click="maximizedToggle = true"
                      :disable="maximizedToggle"
                    >
                      <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup @click="ClearAll">
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>

                  <q-card-section>
                    <div class="text-h6">Add New Course</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none text-white">
                    <q-form @submit="AddCourse">
                      <q-select v-model="newcourse" :options="tmpcourse" label="Select Course" />
                      <q-select
                        v-model="newcoursetype"
                        :options="tmpcoursetype"
                        label="Select Course Type"
                      />
                      <q-input
                        v-model="tmpLecturer"
                        label="Lecturer Name"
                        placeholder="eg:- Dr. Noel Fernando"
                        color="white"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                      />
                      <q-input
                        v-model="tmpDay"
                        label="Course Day"
                        placeholder="eg:- Monday"
                        color="white"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                      />
                      <q-input
                        label="StartTime"
                        v-model="tmpStartTime"
                        mask="time"
                        :rules="['time']"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="tmpStartTime">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                      <q-input label="EndTime" v-model="tmpEndTime" mask="time" :rules="['time']">
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="tmpEndTime">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input
                        v-model="tmplink"
                        label="Lecture Link"
                        placeholder="eg:- 3.00"
                        color="white"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                      />
                      <q-btn label="Add Course" type="submit" />
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-tab-panel>-->
              
          <q-tab-panel name="Admin">
            <div>Admin</div>
            <div>Today Lectures</div>
            
            <div class="flex flex-center">
              <q-card class=" q-pa-md q-ma-lg my-card2" @click="Adddialog = true">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  <div class="absolute-bottom text-subtitle2 text-center">Add New Course</div>
                  <q-tooltip
                    class="bg-indigo text-body2"
                    :offset="[10, 10]"
                    transition-show="rotate"
                    transition-hide="rotate"
                  >Add new Course</q-tooltip>
                </q-img>
              </q-card>
              <q-card class="my-card2 q-pa-md q-ma-lg" @click="Editdialog = true">
                <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
                  <div class="absolute-bottom text-subtitle2 text-center">Edit Course</div>
                  <q-tooltip>Edit a Course</q-tooltip>
                </q-img>
              </q-card>
            </div>

            <div class="q-pa-md q-gutter-sm">
              <q-dialog
                v-model="Editdialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="slide-up"
                transition-hide="slide-down"
              >
                <q-card class="bg-secondary text-white DialogBox">
                  <q-bar>
                    <q-space />

                    <q-btn
                      dense
                      flat
                      icon="minimize"
                      @click="maximizedToggle = false"
                      :disable="!maximizedToggle"
                    >
                      <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      icon="crop_square"
                      @click="maximizedToggle = true"
                      :disable="maximizedToggle"
                    >
                      <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup @click="ClearAll">
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>

                  <q-card-section>
                    <div class="text-h6">Edit Course</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none text-white">
                    <q-form>
                      <q-select v-model="model" :options="AllcoursesID" label="All Courses" />
                      <span>
                        Course Name :
                        <q-input
                          filled
                          v-model="tmpCourseName"
                          :placeholder="courses[model].CourseName"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecturer Name:
                        <q-input
                          filled
                          v-model="tmpLecturer"
                          :placeholder="courses[model].Lecturer"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture Day:
                        <q-input
                          filled
                          v-model="tmpDay"
                          :placeholder="courses[model].tmpDay"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture Start Time:
                        <q-input
                          filled
                          v-model="tmpStartTime"
                          :placeholder="courses[model].StartTime"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture End Time:
                        <q-input
                          filled
                          v-model="tmpEndTime"
                          :placeholder="courses[model].EndTime"
                          :dense="dense"
                        />
                      </span>
                      <span>
                        Lecture Link:
                        <q-input
                          filled
                          v-model="tmplink"
                          :placeholder="courses[model].link"
                          :dense="dense"
                        />
                      </span>
                      <q-btn label="Update Course" @click="UpdateCourse" />
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>

              <q-dialog
                v-model="Adddialog"
                persistent
                :maximized="maximizedToggle"
                transition-show="slide-up"
                transition-hide="slide-down"
              >
                <q-card class="bg-secondary text-white DialogBox">
                  <q-bar>
                    <q-space />

                    <q-btn
                      dense
                      flat
                      icon="minimize"
                      @click="maximizedToggle = false"
                      :disable="!maximizedToggle"
                    >
                      <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
                    </q-btn>
                    <q-btn
                      dense
                      flat
                      icon="crop_square"
                      @click="maximizedToggle = true"
                      :disable="maximizedToggle"
                    >
                      <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
                    </q-btn>
                    <q-btn dense flat icon="close" v-close-popup @click="ClearAll">
                      <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                  </q-bar>

                  <q-card-section>
                    <div class="text-h6">Add New Course</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none text-white">
                    <q-form @submit="AddCourse">
                      <q-select v-model="newcourse" :options="tmpcourse" label="Select Course" />
                      <q-select
                        v-model="newcoursetype"
                        :options="tmpcoursetype"
                        label="Select Course Type"
                      />
                      <q-input
                        v-model="tmpLecturer"
                        label="Lecturer Name"
                        placeholder="eg:- Dr. Noel Fernando"
                        color="white"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                      />
                      <q-input
                        v-model="tmpDay"
                        label="Course Day"
                        placeholder="eg:- Monday"
                        color="white"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                      />
                      <q-input
                        label="StartTime"
                        v-model="tmpStartTime"
                        mask="time"
                        :rules="['time']"
                      >
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="tmpStartTime">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                      <q-input label="EndTime" v-model="tmpEndTime" mask="time" :rules="['time']">
                        <template v-slot:append>
                          <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-time v-model="tmpEndTime">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input
                        v-model="tmplink"
                        label="Lecture Link"
                        placeholder="eg:- 3.00"
                        color="white"
                        lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please type something']"
                      />
                      <q-btn label="Add Course" type="submit" />
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h4 q-mb-md">Alarms</div>
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h4 q-mb-md">Movies</div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>
<script>
import { ref,watch } from "vue";
import {mapActions,mapGetters} from 'vuex'
import {useQuasar} from 'quasar'

export default {
  setup() {
    const q = useQuasar();
    const tmpcourse = ['SCS1209 - Object Oriented Programming', 'SCS1208 - Data Structure & Algorithm', 'SCS1210 - Operating System', 'SCS1211 - Software Engineering', 'SCS1212 - Discrete Mathematics', 'ENH1201 - Enhancement II']
    const tmpcoursetype = ['Practical Session', 'Live Lectures', 'Tutorial Session']
    const newcourse = ref('')
    const newcoursetype = ref('')
    const edited = ref(false)
    const model = ref("SCS1209LS")
    const tmpLecturer = ref('')
    const tmpCourseName = ref('')
    const tmpDay = ref('')
    const tmpStartTime = ref('')
    const tmpEndTime = ref('')
    const tmpCoursename = ref('')
    const tmplink = ref('')
    watch(model, () => {
      console.log("Watched")

      if (edited.value) {
        console.log("Edited");
        edited.value = false
      }
      else {

        console.log("Not Edited");
      }
    })
    return {
      tmpcourse,
      tmpcoursetype,
      newcourse,
      newcoursetype,
      edited,
      tmpLecturer,
      tmpCourseName,
      tmpDay,
      tmpStartTime,
      tmpEndTime,
      tmpCoursename,
      tmplink,
      tab: ref("Lectures"),
      splitterModel: ref(20),
      text: ref(''),
      ph: ref(''),
      Adddialog: ref(false),
      Editdialog: ref(false),
      maximizedToggle: ref(false),
      model,
      dense: ref(false),
      q
  }
  },
  mounted() {
    this.getCourses();
  },
  computed: {
    // ...mapState('stores',['courses'])
    ...mapGetters('stores', ['courses', 'AllcoursesID'])
  },
  methods: {
    ...mapActions('stores', ['getCourses', 'Updatecourses']),
    Editcourse(coursemodel) {
      if (this.edited) {
        this.tmpCourseName = this.courses[coursemodel].CourseName
        this.tmpLecturer = this.courses[coursemodel].Lecturer
        this.tmpDay = this.courses[coursemodel].Day
        this.tmpStartTime = this.courses[coursemodel].StartTime
        this.tmpEndTime = this.courses[coursemodel].EndTime
        this.tmpCoursename = this.courses[coursemodel].CourseName
        this.tmplink = this.courses[coursemodel].link
        this.edited = false
        console.log("Updated");
      }
      else {
        this.edited = true
      }
    },
    AddCourse() {
      console.log("Added");
      console.log(this.newcourse.substring(0, 7));
      let Coursetype = '';
      let CourseName = this.newcourse.substring(10);
      console.log(CourseName);
      if (this.newcoursetype == 'Live Lectures') {
        Coursetype = 'LS'
      }
      else if (this.newcoursetype == 'Tutorial Session') {
        Coursetype = 'TS'
      }
      else if (this.newcoursetype == 'Practical Session') {
        Coursetype = 'PS'
      }
      let CourseID = this.newcourse.substring(0, 7) + Coursetype;
      this.Updatecourses({
        ID: CourseID,
        CourseName: CourseName,
        Day: this.tmpDay,
        Lecturer: this.tmpLecturer,
        StartTime: this.tmpStartTime,
        EndTime: this.tmpEndTime,
        link: this.tmplink,
      })
      this.q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Course Added!'
      })
      this.Adddialog = false;

    },
    ClearAll() {
      this.newcourse = ''
      this.newcoursetype = ''
      this.tmpLecturer = ''
      this.tmpDay = ''
      this.tmpStartTime = ''
      this.tmpEndTime = ''
      this.tmpCoursename = ''
      this.tmplink = ''
    },
    UpdateCourse() {
      console.log("Updated");
      this.Updatecourses({
        ID: this.model,
        CourseName: this.tmpCourseName,
        Day: this.tmpDay,
        Lecturer: this.tmpLecturer,
        StartTime: this.tmpStartTime,
        EndTime: this.tmpEndTime,
        link: this.tmplink,
      })

    }
  }
};
</script>

<style lang="sass" scoped>
.q-tab-panels
  min-height: 90vh
.my-card
  max-width: 400px
  min-width: 400px
  max-height: 400px
  min-height: 400px
.my-admin-card
  margin: 50px
  max-width: 400px
  min-width: 400px
  max-height: 500px
  min-height: 500px
.card
  margin-top: 20px
  margin-left: 20px
.mydiv
  margin-top: 20px
  text-align: center
.q-input
  padding: 5px
.space
  height: 50px
.DialogBox
  min-width: 500px
  min-height: 600px
.my-card2
  width: 100%
  max-width: 250px
  min-width: 250px
  max-height: 250px
  min-height: 250px
</style>
