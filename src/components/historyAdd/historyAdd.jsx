import "./historyAdd.css";
import { useSelector } from "react-redux";
import { addDataHistory } from "../../api.js";
import { useState } from "react";
import { HistorySubscriber } from "../reload/history.js";

export const HistoryAdd = () => {
 

  // const hd2 = [
  //   {
  //     release: [
  //       {
  //         data: [
  //           {
  //             curses: [
  //               {
  //                 completedCounter: 3,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Попрошайка",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 3,
  //               },
  //               {
  //                 completedCounter: 5,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Сокровищница",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 5,
  //               },
  //               {
  //                 completedCounter: 3,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Бомж",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 3,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Брелок",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Бомбаключ",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Запрет",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Шипы",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Кубики",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //             ],
  //             name: "BradHi",
  //           },
  //           {
  //             curses: [
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Сокровищница",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Испытание",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Магазин",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Пилюля",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 3,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Бомж",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 3,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Брелок",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Бомбаключ",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Запрет",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Шипы",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //             ],
  //             name: "Pool",
  //           },
  //           {
  //             curses: [
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Сокровищница",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Испытание",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Магазин",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Пилюля",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 3,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Бомж",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 3,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Брелок",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Бомбаключ",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Автоматы",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //             ],
  //             name: "Evikey",
  //           },
  //           {
  //             curses: [
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Сокровищница",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Испытание",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Магазин",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 3,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Бомж",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 3,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Бомбаключ",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Автоматы",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Попрошайка",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Шипы",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Кубики",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //             ],
  //             name: "NAMVSEYASNO",
  //           },
  //         ],
  //         name: "The Binding of Isaac: Repentance",
  //         url: "https://youtu.be/xyJ1gpduv8I",
  //       },
  //       {
  //         data: [
  //           {
  //             curses: [
  //               {
  //                 completedCounter: 4,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Перо",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 4,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Кошмар",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 4,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Сундук",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 4,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Королева",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Богач",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Квест",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 5,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Магазин",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 5,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Целебный фонтан",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Книга",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Колодец желаний",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //             ],
  //             name: "Sieliya_Farres + DRONE_TheSwarm",
  //           },
  //           {
  //             curses: [
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Перо",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Кошмар",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Сундук",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Королева",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Богач",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Квест",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 3,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Магазин",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 3,
  //               },
  //               {
  //                 completedCounter: 4,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Целебный фонтан",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 4,
  //               },
  //               {
  //                 completedCounter: 4,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Книга",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 4,
  //               },
  //             ],
  //             name: "Pool + Kisumichan",
  //           },
  //           {
  //             curses: [
  //               {
  //                 completedCounter: 4,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Перо",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 4,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Кошмар",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //               {
  //                 completedCounter: 4,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Сундук",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 4,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Королева",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Богач",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Квест",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Магазин",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 3,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Целебный фонтан",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 3,
  //               },
  //             ],
  //             name: "Tijoe + WOOM0N",
  //           },
  //           {
  //             curses: [
  //               {
  //                 completedCounter: 3,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Перо",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 3,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Кошмар",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Сундук",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Книга",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Королева",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Богач",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Квест",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 2,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Магазин",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 2,
  //               },
  //               {
  //                 completedCounter: 1,
  //                 general: false,
  //                 image: {
  //                   icon: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Ficon?alt=media&token=f5aba440-387a-4d93-90bd-6c47ee9ef6c8",
  //                   img: "https://firebasestorage.googleapis.com/v0/b/table-d13fe.appspot.com/o/%D0%9B%D0%B5%D0%B2%D1%8B%D0%B9%2Fimg?alt=media&token=8da023ef-9384-406d-9ec3-c6b0091f35de",
  //                 },
  //                 name: "Целебный фонтан",
  //                 title:
  //                   "Игрок обязан взять самое левое улучшение после лвлапа. Рероллить нельзя. ",
  //                 totalCounter: 1,
  //               },
  //             ],
  //             name: "K0lenochka + Derkus",
  //           },
  //         ],
  //         name: "Ravenswatch",
  //         url: "https://youtu.be/oL4Ek6xDY6Q",
  //       },
  //     ],
  //     year: 2024,
  //   },
  // ];

  const admin = useSelector((state) => state.table.adminData);
  const participant = useSelector((state) => state.table.participantData);
  let dataHis = useSelector((state) => state.table.history);
  const currentYear = new Date().getFullYear();

  const [name, setName] = useState(admin.gameName || "");
  const [url, setUrl] = useState("");
  // useEffect(() => {
  //   console.log(dataHis);
  // }, [dataHis]);

  const handleAddHistory = () => {
    let newData = dataHis?.map((obj) => ({ ...obj })) || [];
    const lastYear = newData[newData.length - 1];

    let member1 = [];
    participant[0].curses.map((item) => member1.push(item));
    let member2 = [];
    participant[1].curses.map((item) => member2.push(item));
    let member3 = [];
    participant[2].curses.map((item) => member3.push(item));
    let member4 = [];
    participant[3].curses.map((item) => member4.push(item));

    if (Number(lastYear?.year) === currentYear) {
      lastYear.release = [
        ...lastYear.release,
        {
          name: name,
          url: url,
          data: [
            { name: admin.listMember[0], curses: member1 },
            { name: admin.listMember[1], curses: member2 },
            { name: admin.listMember[2], curses: member3 },
            { name: admin.listMember[3], curses: member4 },
          ],
        },
      ];
    } else {
      newData.push({
        year: currentYear,
        release: [
          {
            name: name,
            url: url,
            data: [
              { name: admin.listMember[0], curses: member1 },
              { name: admin.listMember[1], curses: member2 },
              { name: admin.listMember[2], curses: member3 },
              { name: admin.listMember[3], curses: member4 },
            ],
          },
        ],
      });
    }
    addDataHistory(newData);
    setUrl("");
    setName("");
  };

  return (
    <div className="historyAdd">
      <HistorySubscriber />
      <input
        className="inputAdmin"
        value={name}
        type="text"
        placeholder="Введите название выпуска"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        className="inputAdmin"
        value={url}
        type="text"
        placeholder="Вставте ссылку"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      ></input>
      <button
        className="buttonAdmin"
        disabled={name === "" || url === ""}
        onClick={() => {
          handleAddHistory();
        }}
      >
        Сформировать историю выпуска
      </button>
    </div>
  );
};
