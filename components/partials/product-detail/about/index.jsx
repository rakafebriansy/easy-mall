import { Text, View } from "react-native";
const About = ({ product }) => {
    return (
        <View style={{
            backgroundColor: 'white',
            padding: 20,
            flex: 1
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 18
            }}>About</Text>
            <Text style={{
                fontFamily: 'outfit',
                textAlign: 'justify'
            }}>{product.about}</Text>
        </View>
    );
};
export default About;