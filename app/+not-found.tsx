import Button from '@/components/Button'
import { ThemedText } from '@/components/ThemedText'
import { Link } from 'expo-router'
import Head from 'expo-router/head'
import { StyleSheet, View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Head>
        <title>{'Oops! This screen does not exist - TechNews'}</title>
      </Head>
      <View style={styles.container}>
        <ThemedText variant='h2'>This screen does not exist.</ThemedText>
        <Link href='/' asChild>
          <Button>
            <ThemedText>Go to home screen!</ThemedText>
          </Button>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 25,
  },
})
