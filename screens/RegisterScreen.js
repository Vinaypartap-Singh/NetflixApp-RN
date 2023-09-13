import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerAccount = () => {
    if (email === "" || password === "" || username === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details to continute",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancelled"),
            style: "cancel",
          },
          {
            text: "Ok",
            onPress: () => console.log("Ok"),
            style: "destructive",
          },
        ]
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const uid = user.uid;
          setDoc(doc(db, "users", `${uid}`), {
            username: username,
            email: email,
          });
          Alert.alert(
            "Success",
            "Your account has been created successfully. Login to continute",
            [
              {
                text: "Ok",
                style: "cancel",
              },
            ]
          );
          navigation.navigate("Login");
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Error", errorMessage);
          console.log(errorMessage);
        });
    }
  };

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
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
        <View style={{ width: 300, marginTop: 20 }}>
          <TextInput
            value={username}
            onChangeText={(username) => setUsername(username)}
            placeholder="UserName"
            placeholderTextColor={"white"}
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "grey",
              paddingVertical: 18,
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "grey",
            }}
          />
        </View>
        <View style={{ width: 300, marginTop: 20 }}>
          <TextInput
            placeholder="Email"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            placeholderTextColor={"white"}
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "grey",
              paddingVertical: 18,
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "grey",
            }}
          />
        </View>
        <View style={{ width: 300, marginTop: 20 }}>
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={"white"}
            style={{
              color: "white",
              borderWidth: 1,
              borderColor: "grey",
              paddingVertical: 18,
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "grey",
            }}
          />
        </View>
        <View style={{ width: 300, marginTop: 20 }}>
          <TouchableOpacity
            onPress={registerAccount}
            style={{
              borderWidth: 1,
              borderColor: password.length > 8 ? "red" : "white",
              paddingVertical: 20,
              borderRadius: 5,
              backgroundColor: password.length > 8 ? "red" : "black",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 300,
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Login Now
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({});
