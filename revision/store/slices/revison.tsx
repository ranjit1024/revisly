import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sessionType {
  topic?: string;
  time?: string ;
  sessionIntervel?: String[];
  totalDays?: number;
  id?:string;
  startDate?:String;
  endDate?:String;
  difficulty?:"easy" | "medium" | 'hard';
  days?:string[] | null;
}

export const sessionSlice = createSlice({
  name: "revision",
  initialState: {} as sessionType,
  
  reducers: {
    addTopic(state, action: PayloadAction<sessionType>) {
      state.topic = action.payload.topic;
    },
    addTime(state, action: PayloadAction<sessionType>) {
      state.time = action.payload.time;
    },
    addSessionInterl(state, action: PayloadAction<sessionType>) {
      state.sessionIntervel = action.payload.sessionIntervel;
    },
    addTotalDays(state, action: PayloadAction<sessionType>) {
      state.totalDays = action.payload.totalDays;
    },
    addsessionId(state, action:PayloadAction<sessionType>){
      state.id = action.payload.id;
    },
    addDifficulty(state, action:PayloadAction<sessionType>){
      state.difficulty = action.payload.difficulty
    },
    addStartTime(state, action:PayloadAction<sessionType>){
      state.startDate = action.payload.startDate
    },
    addEndTime(state, action:PayloadAction<sessionType>){
      state.endDate = action.payload.endDate
    },
    addDays(state, action:PayloadAction<sessionType>){
      state.days = action.payload.days
    }
    
  },
});

export const actions = sessionSlice.actions;
