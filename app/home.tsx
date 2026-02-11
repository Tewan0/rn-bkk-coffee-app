import { supabase } from "@/services/supabase";
import { CoffeeShop } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  //สร้าง state เพื่อเก็บข้อมูล coffee_shops
  const [shops, setShops] = useState<CoffeeShop[]>([]);

  //ฟังก์ชันเพื่อดึงข้อมูลจากตาราง coffee_shops
  useEffect(() => {
    const fetchCoffeeShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        Alert.alert("คำเตือน", "เกิดข้อผิดพลาดในการดึงข้อมูลร้านกาแฟ");
      } else {
        setShops(data);
      }
    };
    fetchCoffeeShops();
  }, []);

  //สร้างหน้าตาของ component รายการที่จะแสดงใน FlatList
  const renderShopItem = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            id: item.id,
            name: item.name,
            district: item.district,
            description: item.description,
            latitude: item.latitude,
            longitude: item.longitude,
            image_url: item.image_url,
            phone: item.phone,
          },
        })
      }
    >
      <Image source={{ uri: item.image_url }} style={styles.shopImage} />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.shopDistrict}>📍 {item.district}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        contentContainerStyle={{ padding: 5 }}
        showsVerticalScrollIndicator={true} //แสดง scroll bar
        data={shops} //กำหนดข้อมูลที่จะแสดงใน FlatList
        keyExtractor={(item) => item.id} //กำหนด key สำหรับแต่ละรายการ
        renderItem={renderShopItem} //หน้าตาของแต่ละรายการที่จะแสดงใน FlatList
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shopName: {
    fontFamily: "Kanit_700Bold",
    fontSize: 18,
    marginBottom: 5,
  },
  shopDistrict: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#868686",
  },
  shopImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 8,
    padding: 10,
    borderRadius: 5,
  },
});
