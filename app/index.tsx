// this page is to redirect the roots --> donc to know how the page goes, and how it starts with what page 
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(auth)/welcome" />;
}
