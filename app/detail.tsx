import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  //สร้างตัวแปรเก็บข้อมูลที่ส่งมาจากหน้า Home
  const params = useLocalSearchParams();

  //ฟังก์ชันเพื่อเปิดแอปโทรศัพท์
  const handleCallApp = () => {
    const phoneNumber = params.phone as string;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  // ฟังก์ชันสำหรับเปิดแอปแผนที่
  const handleOpenMapApp = () => {
    //สร้างตัวแปรเพื่อเปิด Google Maps
    const googleMap = `https://maps.google.com/?q=${params.latitude},${params.longitude}`;

    //สร้างตัวแปรเพื่อเปิด Apple Maps
    const appleMap = `http://maps.apple.com/?q=${params.name}?&ll=${params.latitude},${params.longitude}`;

    //ตรวจสอบการเปิดแอป Google Maps หรือ Apple Maps โดยยึด Google Maps เป็นหลัก
    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image
        source={{ uri: params.image_url as string }}
        style={styles.shopImage}
      />
      <View style={{ padding: 15, marginTop: 10 }}>
        <Text style={styles.shopName}>{params.name}</Text>
        <Text style={styles.shopDistrict}>{params.district as string}</Text>
        <Text style={styles.shopDescription}>
          {params.description as string}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleCallApp}>
          <Text>📞 {params.phone as string}</Text>
        </TouchableOpacity>
        <Text style={[styles.shopName, { marginTop: 20, fontSize: 16 }]}>
          แผนที่ร้าน:
        </Text>
        <MapView
          style={{ width: "100%", height: 300, marginTop: 10 }}
          initialRegion={{
            latitude: parseFloat(params.latitude as string),
            longitude: parseFloat(params.longitude as string),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(params.latitude as string),
              longitude: parseFloat(params.longitude as string),
            }}
            title={params.name as string}
            description={params.description as string}
            onPress={handleOpenMapApp}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#28d402",
    alignItems: "center",
    borderRadius: 5,
  },
  shopDescription: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    marginTop: 15,
  },
  shopDistrict: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    marginTop: 5,
    color: "#7a7a7a",
  },
  shopName: {
    fontFamily: "Kanit_700Bold",
    fontSize: 22,
  },
  shopImage: {
    width: "100%",
    height: 200,
  },
});
