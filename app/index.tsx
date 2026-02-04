import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const logo = require("@/assets/images/coffeeshop.png");

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // ใช้ replace เพื่อไม่ให้กด Back กลับมาหน้านี้ได้
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Top 10 Bangkok Coffee</Text>
      <Text style={styles.caption}>ที่สุดของกาแฟในกรุงเทพฯ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: { width: 150, height: 150, marginBottom: 20, borderRadius: 20 },
  title: { fontFamily: "Kanit_600SemiBold", fontSize: 28, color: "#4A3B32" },
  caption: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
});
