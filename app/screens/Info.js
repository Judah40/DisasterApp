import React, { useEffect, useState } from "react";
import { NavigationEvents } from "@react-navigation/native";
import { getPageTitle, getLanguage } from "../components/commonFn";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { styles } from "../components/styles";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HowToSearch from "./HowToSearch";
import HowToDownload from "./HowToDownload";
import LanguagesMap from "./LanguagesMap";

const InfoClass = ({ navigation }) => {
  // Used to trigger re-rendering on Focus (fixed Change Language from Settings bug)
  const setDefaultLanguage = async () => {
    getLanguage().then((language) => {
      setLanguageTerms(language);
      // // // console.log("setLanguageTerms Help Page ----->", language);
    });
  };

  // ---GET LANGUAGE FROM ASYNCSTORAGE-------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [language, setLanguageTerms] = useState("");
  useEffect(() => {
    getLanguage().then((language) => {
      setLanguageTerms(language);
      // // console.log("setLanguageTerms Search Page ----->", language);
    });
  }, []);
  // PAGE TITLE
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    try {
      getPageTitle("help").then((result) => {
        setPageTitle(result);
      });
    } catch {
      // // console.log("Error: couldn't get pageTitle");
    }
  }, [language]);

  const [orientation, setOrientation] = useState("landscale");
  useEffect(() => {
    setDefaultLanguage()
    checkOrientation();
  }, []);

  const checkOrientation = () => {
    var width = Dimensions.get("window").width;
    var height = Dimensions.get("window").height;
    setOrientation(width > height ? "lanscale" : "portrait");
  };
  Dimensions.addEventListener("change", () => {
    checkOrientation();
  });

  return (
    <View>
      {/* BACKGROUND IMAGE*/}
      <ImageBackground
        source={require("../assets/clouds.jpeg")}
        style={styles.backGroundImage}
      >
        {/* HEADER*/}
        <View style={styles.myHeaderViewHelp}>
          <Text style={styles.myHeaderText}>{pageTitle}</Text>
        </View>
        {/* MAIN CONTAINER*/}
        <View
          style={[
            styles.containerInfo,
            {
              flexDirection: orientation == "lanscale" ? "row" : "column",
              justifyContent: "space-evenly",
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: orientation == "lanscale" ? "row" : "column",
                marginBottom: orientation == "lanscale" ? 10 : 0,
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={styles.sectionBox}
                title="LanguagesMap"
                onPress={() => navigation.navigate("LanguagesMap")}
              >
                <Text style={styles.sectionTitle}>Languages Map</Text>
                <View style={styles.sectionImgBtn}>
                  <FontAwesome
                    name="play"
                    size={50}
                    color="#0090d2"
                    style={styles.infoPlayBtn}
                  />

                  <Image
                    source={require("../assets/countries_languages.png")}
                    style={styles.sectionImage}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sectionBox}
                title="HowToSearch"
                onPress={() => navigation.navigate("HowToSearch")}
              >
                <Text style={styles.sectionTitle}>How to Search</Text>
                <View style={styles.sectionImgBtn}>
                  <FontAwesome
                    name="play"
                    size={50}
                    color="#0090d2"
                    style={styles.infoPlayBtn}
                  />
                  <Image
                    source={require("../assets/searchguy.png")}
                    style={styles.sectionImage}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sectionBox}
                title="HowToDownload"
                onPress={() => navigation.navigate("HowToDownload")}
              >
                <Text style={styles.sectionTitle}>How to Download</Text>
                <View style={styles.sectionImgBtn}>
                  <FontAwesome
                    name="play"
                    size={50}
                    color="#0090d2"
                    style={styles.infoPlayBtn}
                  />
                  <Image
                    source={require("../assets/downloadsimg.jpeg")}
                    style={styles.sectionImage}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};


const Info = ()=>{
  const Stack = createNativeStackNavigator();
  return(

    <Stack.Navigator navigationOptions={{headerMode:"Screen", headerBackTitle:"none"}} screenOptions={{headerShown:false}}>
        <Stack.Screen name="InfoClass" component={InfoClass} navigationOptions={{ headerShown: false,
          headerTitle: "Help",
          headerBackTitleVisible: false,
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: "#0090d2",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
          },}} />
        <Stack.Screen name="HowToSearch" component={HowToSearch} navigationOptions={{  headerShown: false,
          headerTitle: "How To Search",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#0090d2",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
          },}}/>
        <Stack.Screen name="HowToDownload" component={HowToDownload} navigationOptions={{ headerShown: false,
          headerTitle: "How To Download",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#0090d2",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
          },}} />
        <Stack.Screen name="LanguagesMap" component={LanguagesMap} navigationOptions={{ headerShown: false,
          headerTitle: "LanguagesMap",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#0090d2",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
          },}} />
      </Stack.Navigator>
  )

}




export default Info;
