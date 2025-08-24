import CommentSvg from '@/assets/svgs/CommentSvg'
import SignatureSvg from '@/assets/svgs/SignatureSvg'
import StarSvg from '@/assets/svgs/StarSvg'
import { Article } from '@/types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { StyleProps } from 'react-native-reanimated'
import { ExternalLink } from '../ExternalLink'
import { ThemedText } from '../ThemedText'

const ArticleStatsBy = ({
  article,
  animatedStyle,
  withExternalLink = false,
}: {
  article: Article
  animatedStyle?: StyleProps
  withExternalLink?: boolean
}) => {
  function renderCommentIcon() {
    return (
      <View style={[styles.flexCenter, { gap: 5 }]}>
        <CommentSvg stroke='white' strokeWidth={1} width={18} />
        <ThemedText style={{ fontSize: 14 }}>{article.descendants || 0}</ThemedText>
      </View>
    )
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[styles.flexCenter, { gap: 10 }]}>
        <View style={[styles.flexCenter, { gap: 5 }]}>
          <StarSvg stroke='white' strokeWidth={1} width={18} />
          <ThemedText style={{ fontSize: 14 }}>{article.score || 0}</ThemedText>
        </View>

        {withExternalLink ? (
          <ExternalLink href={`https://news.ycombinator.com/item?id=${article.id}`}>
            {renderCommentIcon()}
          </ExternalLink>
        ) : (
          renderCommentIcon()
        )}
      </View>

      {article.by && (
        <View style={[styles.flexCenter, { gap: 5 }]}>
          <SignatureSvg stroke='white' strokeWidth={1} width={18} />
          <View style={styles.typeContainer}>
            <ThemedText style={styles.type}>{article.type}</ThemedText>
          </View>
          <ThemedText style={{ fontSize: 12 }}>by {article.by}</ThemedText>
        </View>
      )}
    </Animated.View>
  )
}

export default ArticleStatsBy

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    flexWrap: 'wrap',
  },
  flexCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
  },
  typeContainer: {
    backgroundColor: '#df171e',
    paddingHorizontal: 2,
  },
  type: {
    fontSize: 11,
    fontWeight: 900,
    lineHeight: 14,
    textTransform: 'uppercase',
  },
})
