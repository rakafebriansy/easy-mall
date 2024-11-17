import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput, ToastAndroid, TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import { getRecords, storeRecord } from "../../services";
import Loading from "../../components/elements/Utils/Loading";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import ValidationError from "../../errors/ValidationError";

const AddProduct = ({}) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isFetching, setIsFecthing] = useState(false);
  const { isLoaded, user } = useUser();

  // form
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const data = await getRecords("category");
      data.forEach((category) => {
        setCategories((prev) => [
          ...prev,
          {
            label: category.name,
            value: category.name,
          },
        ]);
      });
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching list of categories", ToastAndroid.SHORT);
    }
  };

  const onImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error(err);
      ToastAndroid.show("Error while fetching product", ToastAndroid.SHORT);
    }
  };

  const onAddNewProduct = async () => {
    try {
      // setIsFecthing(true);

      validateProductForm();

      //   With Image
      //   const imageUrl = await getUrlImage();
      //   await storeProduct(imageUrl);

      //   Without Image
      await storeProduct();

      resetStates();
      ToastAndroid.show("New product added", ToastAndroid.LONG);
    } catch (err) {
      if (err instanceof ValidationError) {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Error while store new product", ToastAndroid.LONG);
      }
    } finally {
      // setIsFecthing(false);
    }
  };

  const getUrlImage = async () => {
    const fileName = Date.now().toString();
    const response = await fetch(image);
    const blob = await response.blob();
    const imageRef = ref(storage, `easy-mall/products/${fileName}`);

    const snapshot = await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const storeProduct = async (imageUrl) => {
    await storeRecord("product-list", Date.now().toString(), {
      name,
      about,
      website,
      address,
      contact,
      category,
      userName: user.fullName,
      userEmail: user.primaryEmailAddress.emailAddress,
      userImage: user.imageUrl,
      imageUrl: imageUrl ?? null,
    });
  };

  const resetStates = () => {
    setName("");
    setAddress("");
    setAbout("");
    setCategory("");
    setContact("");
    setImage("");
    setWebsite("");
  };

  const validateProductForm = () => {
    let valid = true;
    const errors = [];

    // product name
    if (!name.trim()) {
      errors.push("Product name is required");
      valid = false;
    }

    // address
    if (!address.trim()) {
      errors.push("Address is required");
      valid = false;
    }

    // contact
    if (!contact.trim()) {
      errors.push("Contact is required");
      valid = false;
    }

    // website
    if (!website.trim()) {
      errors.push("Website is required");
      valid = false;
    }

    // about
    if (!about.trim()) {
      errors.push("About is required");
      valid = false;
    }

    // category
    if (!category || !category.trim()) {
      errors.push("Category is required");
      valid = false;
    }

    if (valid) {
      return;
    } else {
      throw new ValidationError(errors[0]);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Product",
      headerShown: true,
      headerTitleStyle: {
        fontFamily: "outfit-bold",
      },
    });
    fetchCategories();
  }, []);

  return (
    <>
      {!isFetching && categories.length > 0 && isLoaded ? (
        <View
          style={{
            padding: 20,
            gap: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
            }}
          >
            Fill all details in order to add new product!
          </Text>
          <TouchableOpacity onPress={onImagePick}>
            {image ? (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 15,
                }}
                source={{
                  uri: image,
                }}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={require("../../assets/images/camera.png")}
                />
                <Text
                  style={{
                    color: Colors.GRAY,
                    fontSize: 12,
                  }}
                >
                  // can't upload photo (no billing)
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <View
            style={{
              gap: 10,
            }}
          >
            <TextInput
              placeholder="Name"
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: Colors.PRIMARY,
                backgroundColor: "white",
              }}
              value={name}
              onChangeText={(value) => setName(value)}
            />
            <TextInput
              placeholder="Address"
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: Colors.PRIMARY,
                backgroundColor: "white",
              }}
              value={address}
              onChangeText={(value) => setAddress(value)}
            />
            <TextInput
              placeholder="Contact"
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: Colors.PRIMARY,
                backgroundColor: "white",
              }}
              value={contact}
              onChangeText={(value) => setContact(value)}
            />
            <TextInput
              placeholder="Website"
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: Colors.PRIMARY,
                backgroundColor: "white",
              }}
              value={website}
              onChangeText={(value) => setWebsite(value)}
            />
            <TextInput
              placeholder="About"
              multiline
              numberOfLines={3}
              style={{
                textAlignVertical: "top",
                padding: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: Colors.PRIMARY,
                backgroundColor: "white",
              }}
              value={about}
              onChangeText={(value) => setAbout(value)}
            />
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: Colors.PRIMARY,
                backgroundColor: "white",
              }}
            >
              <RNPickerSelect value={category} onValueChange={(value) => setCategory(value)} items={categories} />
            </View>
          </View>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 5,
            }}
            onPress={onAddNewProduct}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: "white",
                fontSize: 17,
              }}
            >
              + Add
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default AddProduct;
