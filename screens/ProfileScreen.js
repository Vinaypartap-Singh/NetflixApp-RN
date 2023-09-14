import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = auth.currentUser.uid;
  const [profiles, setProfiles] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const docRef = doc(db, "users", `${user}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        setProfiles(docSnap.data().profile);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Register");
      })
      .catch((error) => {
        Alert.alert("Failed", error.message);
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Feather name="user" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            Profile
          </Text>
        </View>
        <TouchableOpacity
          onPress={signOutUser}
          style={{ flexDirection: "row", gap: 5 }}
        >
          <Feather name="log-out" size={24} color="white" />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 60, alignItems: "center" }}>
        <Image
          source={{
            uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
          }}
          style={{
            width: 170,
            height: 70,
            objectFit: "cover",
          }}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <Text style={{ color: "grey", fontSize: 20, textAlign: "center" }}>
          Who's Watching
        </Text>
      </View>
      {/* Profiles */}

      {loading ? (
        <View style={{ marginTop: 40 }}>
          <ActivityIndicator size={"large"} color={"#E50914"} />
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            marginTop: 40,
            justifyContent: "center",
            gap: 60,
            flexWrap: "wrap",
          }}
        >
          {profiles?.map((data, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.replace("Home")}
                key={index}
                style={{ alignItems: "center" }}
              >
                <Image
                  source={{
                    uri: data.Image,
                  }}
                  style={{ width: 90, height: 90, borderRadius: 20 }}
                />
                <Text
                  style={{ color: "white", marginTop: 10, fontWeight: "bold" }}
                >
                  {data.Name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateProfile")}
          style={{
            marginTop: 30,
            alignItems: "center",
            backgroundColor: "#1c1c1c",
            paddingHorizontal: 30,
            paddingVertical: 20,
            gap: 20,
            borderRadius: 10,
          }}
        >
          <Feather name="plus" color={"white"} size={30} />
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            New Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
