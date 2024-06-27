import React, { useEffect, useState } from "react";
import { View, ImageBackground, Text, FlatList } from "react-native";
import { NavigationEvents } from "@react-navigation/native";
import { styles } from "../components/styles";
import ButtonSL from "../components/ButtonSL";
import langButtonsHardCode from "../components/langButtons.json";
import { CheckError } from "../components/checkErrorFn";
import { getPageTitle, setLanguage, getLanguage } from "../components/commonFn";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Languages = ({ navigation }) => {
  const [langButtons, setLangButtons] = useState("");
  useEffect(() => {
    getLanguage().then((language) => {
      setLanguage(language.toLowerCase());
      //// // console.log("getLanguage Languages Page ----->", language);
      APIfetch(language);
    });
  }, []);

  // ---GET LANGUAGE FROM ASYNCSTORAGE-------------------------------------------------------------------------------------------------------------------------------------------------------------
  const [language, setLanguageTerms] = useState("");
  const setDefaultLanguage = async () => {
    getLanguage().then((language) => {
      setLanguageTerms(language);
      //// // console.log("setLanguageTerms Search Page ----->", language);
      APIfetch(language);
    });
  };

  const defaultProcessing = async () => {
    try {
      var allLanguages = await AsyncStorage.getItem("all-languages");
      allLanguages = JSON.parse(allLanguages);
      if (allLanguages != null) {
        setLangButtons(allLanguages);
      }
      if (allLanguages == null) {
        try {
          setLangButtons(langButtonsHardCode);
        } catch (err) {
          Alert.alert("There was a problem. Please contact Admin.");
        }
      }
    } catch (err) {}
  };

  const APIfetch = async () => {
    const url = `https://ymcadrr.southafricanorth.cloudapp.azure.com/api/languages`;
    //// // console.log(url);

    fetch(url)
      .then(CheckError)
      .then((data) => {
        if (data.length) {
          setLangButtons(data);
        } else {
          defaultProcessing().then(() => {});
          // Alert.alert("There was a problem. Please contact Admin.");
        }
      })
      .catch((error) => {
        try {
          defaultProcessing().then(() => {});
        } catch {
          Alert.alert("Please Download terms");
          navigation.navigate("Downloads");
        }
      });
  };

  // PAGE TITLE
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    setDefaultLanguage();
    try {
      getPageTitle("languages").then((result) => {
        setPageTitle(result);
      });
    } catch {}
  }, [language]);

  return (
    <View>
      {/* BACKGROUND IMAGE*/}
      <ImageBackground
        source={require("../assets/clouds.jpeg")}
        style={styles.backGroundImage}
      >
        {/* BUTTONS CONTAINER */}
        <View style={styles.containerSL}>
          <FlatList
            data={langButtons}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ButtonSL
                  lang={item.name}
                  onPress={() => {
                    setLanguage(item.name), navigation.navigate("Home");
                  }}
                />
              );
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Languages;
