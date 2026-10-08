import React from 'react'
import {createSlice} from "@reduxjs/toolkit"

export const diarySlice = createSlice({
    name: "diary",
    initialState: {
        items: (JSON.parse(localStorage.getItem("diarys")) || [])
            .map((diary) => ({
                ...diary,
                id: diary.id ?? crypto.randomUUID(),
            })),
    },
    reducers: {
        addDiary(state, action){
            state.items.push(action.payload)
        },
        deleteDiary(state, action){
            state.items = state.items.filter((diary)=> diary.id !== action.payload)
        },

        updateDiary(state, action) {
                const updated = action.payload;
                const diary= state.items.find((diary)=> diary.id === updated.id);
                if (diary) {
                    diary.title = updated.title;
                    diary.content = updated.content}
            }
        }
    }
)

export const { addDiary, deleteDiary, updateDiary } =
  diarySlice.actions;

export default diarySlice.reducer;