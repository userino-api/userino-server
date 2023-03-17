import disposableEmails from '@libs/dispossableEmails'

const sandboxDomains = [
  'elesb.net',
  'mailinator.com',
]

const personalAttackerDomains = [
  'vireonidae.com',
]

const blockedDomains: string[] = [
  ...disposableEmails,
  ...sandboxDomains,
  ...personalAttackerDomains,
  'iec.co.il', // company asked to block them???
]

function isOk(email?: string | null): boolean {
  if (!email) return false
  if (email.includes('appleid.com')) return false

  const domainMatch = email.match(/@(.+)/)
  if (!domainMatch) return false

  const domain = domainMatch[1]

  if (blockedDomains.includes(domain)) {
    return false
  }

  return true
}

export default {
  isOk,
}
