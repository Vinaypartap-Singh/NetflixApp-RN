import {
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

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            value={email}
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
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
              Sign In
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
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({});
