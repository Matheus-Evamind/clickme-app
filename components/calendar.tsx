import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import axiosInstance, { setAuthToken } from '../api/axios';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LoginUser } from '../api/axios/login';
const timeToString = (time: any) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

interface MyObject {
  height: number;
  name: string;
}
interface Events {
  EventId: string;
  Title: string;
  DtStart: string;
}

interface MyData {
  [key: string]: { height: number; name: string }[];
}
const Schedule: React.FC = () => {

  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {

    async () => {
      const user: any = AsyncStorage.getItem("scheduleId");
      axiosInstance.post("/events/getbyfilter", { ScheduleId: user, isActive: true }).then((res) => {
        setEvents(res.data.List.slice(0, 10));
      })
    }
  }, []);

  const newList: any = {};
  for (const obj of events) {
    let dtStart = obj.DtStart.substring(0, obj.DtStart.indexOf(" "));

    if (!newList[dtStart]) {
      newList[dtStart] = [];
    }

    newList[dtStart].push({
      height: 10,
      name: obj.Title,
    });
  }
  let test: any = {
    "2023-07-04": [
      {
        height: 10,
        name: "test"
      }
    ],
    "2023-07-05": [
      {
        height: 10,
        name: "test"
      }
    ]

  }
  console.log(newList, "newList")
  let formatted: MyData[] = [];
  events.map((event: any) => {
    formatted.push()

  })
  const [items, setItems] = useState<any>({});
  const loadItems = (day: any) => {
    setTimeout(() => {
      for (let i = -15; i < 5; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems: any = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      console.log(newItems, "newItems")
      setItems(newItems);
    }, 1000);
  };
  const renderItem = (item: any) => {
    console.log(item, "item")
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17, }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: "transparent",

              }}>
              <Text style={{ color: "#000" }}>{item.name}</Text>
              {/* <Avatar.Text label="J" /> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={newList}
        loadItemsForMonth={loadItems}
        selected={'2023-07-01'}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Schedule;