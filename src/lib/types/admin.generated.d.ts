/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type CustomerCreateMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.CustomerInput;
}>;


export type CustomerCreateMutation = { customerCreate?: AdminTypes.Maybe<{ userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>>, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'id' | 'email' | 'tags'>> }> };

export type CustomerUpdateMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.CustomerInput;
}>;


export type CustomerUpdateMutation = { customerUpdate?: AdminTypes.Maybe<{ userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>>, customer?: AdminTypes.Maybe<Pick<AdminTypes.Customer, 'id' | 'email' | 'tags'>> }> };

export type MetafieldsSetMutationVariables = AdminTypes.Exact<{
  metafields: Array<AdminTypes.MetafieldsSetInput> | AdminTypes.MetafieldsSetInput;
}>;


export type MetafieldsSetMutation = { metafieldsSet?: AdminTypes.Maybe<{ metafields?: AdminTypes.Maybe<Array<Pick<AdminTypes.Metafield, 'namespace' | 'key' | 'value'>>>, userErrors: Array<Pick<AdminTypes.MetafieldsSetUserError, 'field' | 'message'>> }> };

export type ProductVariantUpdateMutationVariables = AdminTypes.Exact<{
  input: AdminTypes.ProductVariantInput;
}>;


export type ProductVariantUpdateMutation = { productVariantUpdate?: AdminTypes.Maybe<{ product?: AdminTypes.Maybe<Pick<AdminTypes.Product, 'id'>>, productVariant?: AdminTypes.Maybe<Pick<AdminTypes.ProductVariant, 'id' | 'price' | 'compareAtPrice'>>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type TagsAddMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
  tags: Array<AdminTypes.Scalars['String']['input']> | AdminTypes.Scalars['String']['input'];
}>;


export type TagsAddMutation = { tagsAdd?: AdminTypes.Maybe<{ node?: AdminTypes.Maybe<Pick<AdminTypes.AbandonedCheckout, 'id'> | Pick<AdminTypes.AbandonedCheckoutLineItem, 'id'> | Pick<AdminTypes.Abandonment, 'id'> | Pick<AdminTypes.AddAllProductsOperation, 'id'> | Pick<AdminTypes.AdditionalFee, 'id'> | Pick<AdminTypes.App, 'id'> | Pick<AdminTypes.AppCatalog, 'id'> | Pick<AdminTypes.AppCredit, 'id'> | Pick<AdminTypes.AppInstallation, 'id'> | Pick<AdminTypes.AppPurchaseOneTime, 'id'> | Pick<AdminTypes.AppRevenueAttributionRecord, 'id'> | Pick<AdminTypes.AppSubscription, 'id'> | Pick<AdminTypes.AppUsageRecord, 'id'> | Pick<AdminTypes.BasicEvent, 'id'> | Pick<AdminTypes.BulkOperation, 'id'> | Pick<AdminTypes.CalculatedOrder, 'id'> | Pick<AdminTypes.CartTransform, 'id'> | Pick<AdminTypes.CashTrackingAdjustment, 'id'> | Pick<AdminTypes.CashTrackingSession, 'id'> | Pick<AdminTypes.CatalogCsvOperation, 'id'> | Pick<AdminTypes.Channel, 'id'> | Pick<AdminTypes.ChannelDefinition, 'id'> | Pick<AdminTypes.ChannelInformation, 'id'> | Pick<AdminTypes.CheckoutProfile, 'id'> | Pick<AdminTypes.Collection, 'id'> | Pick<AdminTypes.CommentEvent, 'id'> | Pick<AdminTypes.Company, 'id'> | Pick<AdminTypes.CompanyAddress, 'id'> | Pick<AdminTypes.CompanyContact, 'id'> | Pick<AdminTypes.CompanyContactRole, 'id'> | Pick<AdminTypes.CompanyContactRoleAssignment, 'id'> | Pick<AdminTypes.CompanyLocation, 'id'> | Pick<AdminTypes.CompanyLocationCatalog, 'id'> | Pick<AdminTypes.Customer, 'id'> | Pick<AdminTypes.CustomerPaymentMethod, 'id'> | Pick<AdminTypes.CustomerSegmentMembersQuery, 'id'> | Pick<AdminTypes.CustomerVisit, 'id'> | Pick<AdminTypes.DeliveryCarrierService, 'id'> | Pick<AdminTypes.DeliveryCondition, 'id'> | Pick<AdminTypes.DeliveryCountry, 'id'> | Pick<AdminTypes.DeliveryCustomization, 'id'> | Pick<AdminTypes.DeliveryLocationGroup, 'id'> | Pick<AdminTypes.DeliveryMethod, 'id'> | Pick<AdminTypes.DeliveryMethodDefinition, 'id'> | Pick<AdminTypes.DeliveryParticipant, 'id'> | Pick<AdminTypes.DeliveryProfile, 'id'> | Pick<AdminTypes.DeliveryProfileItem, 'id'> | Pick<AdminTypes.DeliveryPromiseProvider, 'id'> | Pick<AdminTypes.DeliveryProvince, 'id'> | Pick<AdminTypes.DeliveryRateDefinition, 'id'> | Pick<AdminTypes.DeliveryZone, 'id'> | Pick<AdminTypes.DiscountAutomaticBxgy, 'id'> | Pick<AdminTypes.DiscountAutomaticNode, 'id'> | Pick<AdminTypes.DiscountCodeNode, 'id'> | Pick<AdminTypes.DiscountNode, 'id'> | Pick<AdminTypes.DiscountRedeemCodeBulkCreation, 'id'> | Pick<AdminTypes.Domain, 'id'> | Pick<AdminTypes.DraftOrder, 'id'> | Pick<AdminTypes.DraftOrderLineItem, 'id'> | Pick<AdminTypes.DraftOrderTag, 'id'> | Pick<AdminTypes.Duty, 'id'> | Pick<AdminTypes.ExchangeLineItem, 'id'> | Pick<AdminTypes.ExchangeV2, 'id'> | Pick<AdminTypes.ExternalVideo, 'id'> | Pick<AdminTypes.Fulfillment, 'id'> | Pick<AdminTypes.FulfillmentConstraintRule, 'id'> | Pick<AdminTypes.FulfillmentEvent, 'id'> | Pick<AdminTypes.FulfillmentLineItem, 'id'> | Pick<AdminTypes.FulfillmentOrder, 'id'> | Pick<AdminTypes.FulfillmentOrderDestination, 'id'> | Pick<AdminTypes.FulfillmentOrderLineItem, 'id'> | Pick<AdminTypes.FulfillmentOrderMerchantRequest, 'id'> | Pick<AdminTypes.GenericFile, 'id'> | Pick<AdminTypes.GiftCard, 'id'> | Pick<AdminTypes.InventoryAdjustmentGroup, 'id'> | Pick<AdminTypes.InventoryItem, 'id'> | Pick<AdminTypes.InventoryItemMeasurement, 'id'> | Pick<AdminTypes.InventoryLevel, 'id'> | Pick<AdminTypes.InventoryQuantity, 'id'> | Pick<AdminTypes.LineItem, 'id'> | Pick<AdminTypes.LineItemGroup, 'id'> | Pick<AdminTypes.LineItemMutable, 'id'> | Pick<AdminTypes.Location, 'id'> | Pick<AdminTypes.MailingAddress, 'id'> | Pick<AdminTypes.Market, 'id'> | Pick<AdminTypes.MarketCatalog, 'id'> | Pick<AdminTypes.MarketRegionCountry, 'id'> | Pick<AdminTypes.MarketWebPresence, 'id'> | Pick<AdminTypes.MarketingActivity, 'id'> | Pick<AdminTypes.MarketingEvent, 'id'> | Pick<AdminTypes.MediaImage, 'id'> | Pick<AdminTypes.Menu, 'id'> | Pick<AdminTypes.Metafield, 'id'> | Pick<AdminTypes.MetafieldDefinition, 'id'> | Pick<AdminTypes.MetafieldStorefrontVisibility, 'id'> | Pick<AdminTypes.Metaobject, 'id'> | Pick<AdminTypes.MetaobjectDefinition, 'id'> | Pick<AdminTypes.Model3d, 'id'> | Pick<AdminTypes.OnlineStoreArticle, 'id'> | Pick<AdminTypes.OnlineStoreBlog, 'id'> | Pick<AdminTypes.OnlineStorePage, 'id'> | Pick<AdminTypes.Order, 'id'> | Pick<AdminTypes.OrderDisputeSummary, 'id'> | Pick<AdminTypes.OrderTransaction, 'id'> | Pick<AdminTypes.PaymentCustomization, 'id'> | Pick<AdminTypes.PaymentMandate, 'id'> | Pick<AdminTypes.PaymentSchedule, 'id'> | Pick<AdminTypes.PaymentTerms, 'id'> | Pick<AdminTypes.PaymentTermsTemplate, 'id'> | Pick<AdminTypes.PriceList, 'id'> | Pick<AdminTypes.PriceRule, 'id'> | Pick<AdminTypes.PriceRuleDiscountCode, 'id'> | Pick<AdminTypes.PrivateMetafield, 'id'> | Pick<AdminTypes.Product, 'id'> | Pick<AdminTypes.ProductBundleOperation, 'id'> | Pick<AdminTypes.ProductFeed, 'id'> | Pick<AdminTypes.ProductOption, 'id'> | Pick<AdminTypes.ProductOptionValue, 'id'> | Pick<AdminTypes.ProductSetOperation, 'id'> | Pick<AdminTypes.ProductTaxonomyNode, 'id'> | Pick<AdminTypes.ProductVariant, 'id'> | Pick<AdminTypes.ProductVariantComponent, 'id'> | Pick<AdminTypes.Publication, 'id'> | Pick<AdminTypes.PublicationResourceOperation, 'id'> | Pick<AdminTypes.QuantityPriceBreak, 'id'> | Pick<AdminTypes.Refund, 'id'> | Pick<AdminTypes.RefundShippingLine, 'id'> | Pick<AdminTypes.Return, 'id'> | Pick<AdminTypes.ReturnLineItem, 'id'> | Pick<AdminTypes.ReturnableFulfillment, 'id'> | Pick<AdminTypes.ReverseDelivery, 'id'> | Pick<AdminTypes.ReverseDeliveryLineItem, 'id'> | Pick<AdminTypes.ReverseFulfillmentOrder, 'id'> | Pick<AdminTypes.ReverseFulfillmentOrderDisposition, 'id'> | Pick<AdminTypes.ReverseFulfillmentOrderLineItem, 'id'> | Pick<AdminTypes.SaleAdditionalFee, 'id'> | Pick<AdminTypes.SavedSearch, 'id'> | Pick<AdminTypes.ScriptTag, 'id'> | Pick<AdminTypes.Segment, 'id'> | Pick<AdminTypes.SellingPlan, 'id'> | Pick<AdminTypes.SellingPlanGroup, 'id'> | Pick<AdminTypes.ServerPixel, 'id'> | Pick<AdminTypes.Shop, 'id'> | Pick<AdminTypes.ShopAddress, 'id'> | Pick<AdminTypes.ShopPolicy, 'id'> | Pick<AdminTypes.ShopifyPaymentsAccount, 'id'> | Pick<AdminTypes.ShopifyPaymentsBalanceTransaction, 'id'> | Pick<AdminTypes.ShopifyPaymentsBankAccount, 'id'> | Pick<AdminTypes.ShopifyPaymentsDispute, 'id'> | Pick<AdminTypes.ShopifyPaymentsDisputeEvidence, 'id'> | Pick<AdminTypes.ShopifyPaymentsDisputeFileUpload, 'id'> | Pick<AdminTypes.ShopifyPaymentsDisputeFulfillment, 'id'> | Pick<AdminTypes.ShopifyPaymentsPayout, 'id'> | Pick<AdminTypes.ShopifyPaymentsVerification, 'id'> | Pick<AdminTypes.StaffMember, 'id'> | Pick<AdminTypes.StandardMetafieldDefinitionTemplate, 'id'> | Pick<AdminTypes.StoreCreditAccount, 'id'> | Pick<AdminTypes.StoreCreditAccountCreditTransaction, 'id'> | Pick<AdminTypes.StoreCreditAccountDebitRevertTransaction, 'id'> | Pick<AdminTypes.StoreCreditAccountDebitTransaction, 'id'> | Pick<AdminTypes.StorefrontAccessToken, 'id'> | Pick<AdminTypes.SubscriptionBillingAttempt, 'id'> | Pick<AdminTypes.SubscriptionContract, 'id'> | Pick<AdminTypes.SubscriptionDraft, 'id'> | Pick<AdminTypes.TaxonomyAttribute, 'id'> | Pick<AdminTypes.TaxonomyCategory, 'id'> | Pick<AdminTypes.TaxonomyChoiceListAttribute, 'id'> | Pick<AdminTypes.TaxonomyMeasurementAttribute, 'id'> | Pick<AdminTypes.TaxonomyValue, 'id'> | Pick<AdminTypes.TenderTransaction, 'id'> | Pick<AdminTypes.TransactionFee, 'id'> | Pick<AdminTypes.UnverifiedReturnLineItem, 'id'> | Pick<AdminTypes.UrlRedirect, 'id'> | Pick<AdminTypes.UrlRedirectImport, 'id'> | Pick<AdminTypes.Validation, 'id'> | Pick<AdminTypes.Video, 'id'> | Pick<AdminTypes.WebPixel, 'id'> | Pick<AdminTypes.WebhookSubscription, 'id'>>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type TagsRemoveMutationVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
  tags: Array<AdminTypes.Scalars['String']['input']> | AdminTypes.Scalars['String']['input'];
}>;


export type TagsRemoveMutation = { tagsRemove?: AdminTypes.Maybe<{ node?: AdminTypes.Maybe<Pick<AdminTypes.AbandonedCheckout, 'id'> | Pick<AdminTypes.AbandonedCheckoutLineItem, 'id'> | Pick<AdminTypes.Abandonment, 'id'> | Pick<AdminTypes.AddAllProductsOperation, 'id'> | Pick<AdminTypes.AdditionalFee, 'id'> | Pick<AdminTypes.App, 'id'> | Pick<AdminTypes.AppCatalog, 'id'> | Pick<AdminTypes.AppCredit, 'id'> | Pick<AdminTypes.AppInstallation, 'id'> | Pick<AdminTypes.AppPurchaseOneTime, 'id'> | Pick<AdminTypes.AppRevenueAttributionRecord, 'id'> | Pick<AdminTypes.AppSubscription, 'id'> | Pick<AdminTypes.AppUsageRecord, 'id'> | Pick<AdminTypes.BasicEvent, 'id'> | Pick<AdminTypes.BulkOperation, 'id'> | Pick<AdminTypes.CalculatedOrder, 'id'> | Pick<AdminTypes.CartTransform, 'id'> | Pick<AdminTypes.CashTrackingAdjustment, 'id'> | Pick<AdminTypes.CashTrackingSession, 'id'> | Pick<AdminTypes.CatalogCsvOperation, 'id'> | Pick<AdminTypes.Channel, 'id'> | Pick<AdminTypes.ChannelDefinition, 'id'> | Pick<AdminTypes.ChannelInformation, 'id'> | Pick<AdminTypes.CheckoutProfile, 'id'> | Pick<AdminTypes.Collection, 'id'> | Pick<AdminTypes.CommentEvent, 'id'> | Pick<AdminTypes.Company, 'id'> | Pick<AdminTypes.CompanyAddress, 'id'> | Pick<AdminTypes.CompanyContact, 'id'> | Pick<AdminTypes.CompanyContactRole, 'id'> | Pick<AdminTypes.CompanyContactRoleAssignment, 'id'> | Pick<AdminTypes.CompanyLocation, 'id'> | Pick<AdminTypes.CompanyLocationCatalog, 'id'> | Pick<AdminTypes.Customer, 'id'> | Pick<AdminTypes.CustomerPaymentMethod, 'id'> | Pick<AdminTypes.CustomerSegmentMembersQuery, 'id'> | Pick<AdminTypes.CustomerVisit, 'id'> | Pick<AdminTypes.DeliveryCarrierService, 'id'> | Pick<AdminTypes.DeliveryCondition, 'id'> | Pick<AdminTypes.DeliveryCountry, 'id'> | Pick<AdminTypes.DeliveryCustomization, 'id'> | Pick<AdminTypes.DeliveryLocationGroup, 'id'> | Pick<AdminTypes.DeliveryMethod, 'id'> | Pick<AdminTypes.DeliveryMethodDefinition, 'id'> | Pick<AdminTypes.DeliveryParticipant, 'id'> | Pick<AdminTypes.DeliveryProfile, 'id'> | Pick<AdminTypes.DeliveryProfileItem, 'id'> | Pick<AdminTypes.DeliveryPromiseProvider, 'id'> | Pick<AdminTypes.DeliveryProvince, 'id'> | Pick<AdminTypes.DeliveryRateDefinition, 'id'> | Pick<AdminTypes.DeliveryZone, 'id'> | Pick<AdminTypes.DiscountAutomaticBxgy, 'id'> | Pick<AdminTypes.DiscountAutomaticNode, 'id'> | Pick<AdminTypes.DiscountCodeNode, 'id'> | Pick<AdminTypes.DiscountNode, 'id'> | Pick<AdminTypes.DiscountRedeemCodeBulkCreation, 'id'> | Pick<AdminTypes.Domain, 'id'> | Pick<AdminTypes.DraftOrder, 'id'> | Pick<AdminTypes.DraftOrderLineItem, 'id'> | Pick<AdminTypes.DraftOrderTag, 'id'> | Pick<AdminTypes.Duty, 'id'> | Pick<AdminTypes.ExchangeLineItem, 'id'> | Pick<AdminTypes.ExchangeV2, 'id'> | Pick<AdminTypes.ExternalVideo, 'id'> | Pick<AdminTypes.Fulfillment, 'id'> | Pick<AdminTypes.FulfillmentConstraintRule, 'id'> | Pick<AdminTypes.FulfillmentEvent, 'id'> | Pick<AdminTypes.FulfillmentLineItem, 'id'> | Pick<AdminTypes.FulfillmentOrder, 'id'> | Pick<AdminTypes.FulfillmentOrderDestination, 'id'> | Pick<AdminTypes.FulfillmentOrderLineItem, 'id'> | Pick<AdminTypes.FulfillmentOrderMerchantRequest, 'id'> | Pick<AdminTypes.GenericFile, 'id'> | Pick<AdminTypes.GiftCard, 'id'> | Pick<AdminTypes.InventoryAdjustmentGroup, 'id'> | Pick<AdminTypes.InventoryItem, 'id'> | Pick<AdminTypes.InventoryItemMeasurement, 'id'> | Pick<AdminTypes.InventoryLevel, 'id'> | Pick<AdminTypes.InventoryQuantity, 'id'> | Pick<AdminTypes.LineItem, 'id'> | Pick<AdminTypes.LineItemGroup, 'id'> | Pick<AdminTypes.LineItemMutable, 'id'> | Pick<AdminTypes.Location, 'id'> | Pick<AdminTypes.MailingAddress, 'id'> | Pick<AdminTypes.Market, 'id'> | Pick<AdminTypes.MarketCatalog, 'id'> | Pick<AdminTypes.MarketRegionCountry, 'id'> | Pick<AdminTypes.MarketWebPresence, 'id'> | Pick<AdminTypes.MarketingActivity, 'id'> | Pick<AdminTypes.MarketingEvent, 'id'> | Pick<AdminTypes.MediaImage, 'id'> | Pick<AdminTypes.Menu, 'id'> | Pick<AdminTypes.Metafield, 'id'> | Pick<AdminTypes.MetafieldDefinition, 'id'> | Pick<AdminTypes.MetafieldStorefrontVisibility, 'id'> | Pick<AdminTypes.Metaobject, 'id'> | Pick<AdminTypes.MetaobjectDefinition, 'id'> | Pick<AdminTypes.Model3d, 'id'> | Pick<AdminTypes.OnlineStoreArticle, 'id'> | Pick<AdminTypes.OnlineStoreBlog, 'id'> | Pick<AdminTypes.OnlineStorePage, 'id'> | Pick<AdminTypes.Order, 'id'> | Pick<AdminTypes.OrderDisputeSummary, 'id'> | Pick<AdminTypes.OrderTransaction, 'id'> | Pick<AdminTypes.PaymentCustomization, 'id'> | Pick<AdminTypes.PaymentMandate, 'id'> | Pick<AdminTypes.PaymentSchedule, 'id'> | Pick<AdminTypes.PaymentTerms, 'id'> | Pick<AdminTypes.PaymentTermsTemplate, 'id'> | Pick<AdminTypes.PriceList, 'id'> | Pick<AdminTypes.PriceRule, 'id'> | Pick<AdminTypes.PriceRuleDiscountCode, 'id'> | Pick<AdminTypes.PrivateMetafield, 'id'> | Pick<AdminTypes.Product, 'id'> | Pick<AdminTypes.ProductBundleOperation, 'id'> | Pick<AdminTypes.ProductFeed, 'id'> | Pick<AdminTypes.ProductOption, 'id'> | Pick<AdminTypes.ProductOptionValue, 'id'> | Pick<AdminTypes.ProductSetOperation, 'id'> | Pick<AdminTypes.ProductTaxonomyNode, 'id'> | Pick<AdminTypes.ProductVariant, 'id'> | Pick<AdminTypes.ProductVariantComponent, 'id'> | Pick<AdminTypes.Publication, 'id'> | Pick<AdminTypes.PublicationResourceOperation, 'id'> | Pick<AdminTypes.QuantityPriceBreak, 'id'> | Pick<AdminTypes.Refund, 'id'> | Pick<AdminTypes.RefundShippingLine, 'id'> | Pick<AdminTypes.Return, 'id'> | Pick<AdminTypes.ReturnLineItem, 'id'> | Pick<AdminTypes.ReturnableFulfillment, 'id'> | Pick<AdminTypes.ReverseDelivery, 'id'> | Pick<AdminTypes.ReverseDeliveryLineItem, 'id'> | Pick<AdminTypes.ReverseFulfillmentOrder, 'id'> | Pick<AdminTypes.ReverseFulfillmentOrderDisposition, 'id'> | Pick<AdminTypes.ReverseFulfillmentOrderLineItem, 'id'> | Pick<AdminTypes.SaleAdditionalFee, 'id'> | Pick<AdminTypes.SavedSearch, 'id'> | Pick<AdminTypes.ScriptTag, 'id'> | Pick<AdminTypes.Segment, 'id'> | Pick<AdminTypes.SellingPlan, 'id'> | Pick<AdminTypes.SellingPlanGroup, 'id'> | Pick<AdminTypes.ServerPixel, 'id'> | Pick<AdminTypes.Shop, 'id'> | Pick<AdminTypes.ShopAddress, 'id'> | Pick<AdminTypes.ShopPolicy, 'id'> | Pick<AdminTypes.ShopifyPaymentsAccount, 'id'> | Pick<AdminTypes.ShopifyPaymentsBalanceTransaction, 'id'> | Pick<AdminTypes.ShopifyPaymentsBankAccount, 'id'> | Pick<AdminTypes.ShopifyPaymentsDispute, 'id'> | Pick<AdminTypes.ShopifyPaymentsDisputeEvidence, 'id'> | Pick<AdminTypes.ShopifyPaymentsDisputeFileUpload, 'id'> | Pick<AdminTypes.ShopifyPaymentsDisputeFulfillment, 'id'> | Pick<AdminTypes.ShopifyPaymentsPayout, 'id'> | Pick<AdminTypes.ShopifyPaymentsVerification, 'id'> | Pick<AdminTypes.StaffMember, 'id'> | Pick<AdminTypes.StandardMetafieldDefinitionTemplate, 'id'> | Pick<AdminTypes.StoreCreditAccount, 'id'> | Pick<AdminTypes.StoreCreditAccountCreditTransaction, 'id'> | Pick<AdminTypes.StoreCreditAccountDebitRevertTransaction, 'id'> | Pick<AdminTypes.StoreCreditAccountDebitTransaction, 'id'> | Pick<AdminTypes.StorefrontAccessToken, 'id'> | Pick<AdminTypes.SubscriptionBillingAttempt, 'id'> | Pick<AdminTypes.SubscriptionContract, 'id'> | Pick<AdminTypes.SubscriptionDraft, 'id'> | Pick<AdminTypes.TaxonomyAttribute, 'id'> | Pick<AdminTypes.TaxonomyCategory, 'id'> | Pick<AdminTypes.TaxonomyChoiceListAttribute, 'id'> | Pick<AdminTypes.TaxonomyMeasurementAttribute, 'id'> | Pick<AdminTypes.TaxonomyValue, 'id'> | Pick<AdminTypes.TenderTransaction, 'id'> | Pick<AdminTypes.TransactionFee, 'id'> | Pick<AdminTypes.UnverifiedReturnLineItem, 'id'> | Pick<AdminTypes.UrlRedirect, 'id'> | Pick<AdminTypes.UrlRedirectImport, 'id'> | Pick<AdminTypes.Validation, 'id'> | Pick<AdminTypes.Video, 'id'> | Pick<AdminTypes.WebPixel, 'id'> | Pick<AdminTypes.WebhookSubscription, 'id'>>, userErrors: Array<Pick<AdminTypes.UserError, 'field' | 'message'>> }> };

export type GetCustomersByEmailQueryVariables = AdminTypes.Exact<{
  filter: AdminTypes.Scalars['String']['input'];
}>;


export type GetCustomersByEmailQuery = { customers: { edges: Array<{ node: Pick<AdminTypes.Customer, 'id' | 'verifiedEmail' | 'firstName' | 'lastName'> }> } };

export type SearchBySkUv2QueryVariables = AdminTypes.Exact<{
  filter: AdminTypes.Scalars['String']['input'];
}>;


export type SearchBySkUv2Query = { products: { edges: Array<{ node: (
        Pick<AdminTypes.Product, 'id' | 'title'>
        & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'sku' | 'id' | 'title'> }> } }
      ) }> } };

export type SearchBySkuQueryVariables = AdminTypes.Exact<{
  filter: AdminTypes.Scalars['String']['input'];
}>;


export type SearchBySkuQuery = { products: { edges: Array<{ node: (
        Pick<AdminTypes.Product, 'id' | 'title' | 'hasOnlyDefaultVariant'>
        & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'sku' | 'id' | 'title'> }> } }
      ) }> } };

interface GeneratedQueryTypes {
  "#graphql\n  query getCustomersByEmail($filter: String!) {\n    customers(first:10, query: $filter) {\n      edges {\n        node {\n          id\n          verifiedEmail\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": {return: GetCustomersByEmailQuery, variables: GetCustomersByEmailQueryVariables},
  "#graphql\n  query searchBySKUv2($filter: String!) {\n    products(first:5, query: $filter) {\n      edges {\n        node {\n          id\n          title\n          variants(first:60) {\n            edges {\n              node {\n                sku\n                id\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: SearchBySKUv2Query, variables: SearchBySKUv2QueryVariables},
  "#graphql\n  query searchBySKU($filter: String!) {\n    products(first:1, query: $filter) {\n      edges {\n        node {\n          id\n          title\n          hasOnlyDefaultVariant\n          variants(first:25) {\n            edges {\n              node {\n                sku\n                id\n                title\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: SearchBySKUQuery, variables: SearchBySKUQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation customerCreate($input: CustomerInput!) {\n    customerCreate(input: $input) {\n      userErrors {\n        field\n        message\n      }\n      customer {\n        id\n        email\n        tags\n      }\n    }\n  }\n": {return: CustomerCreateMutation, variables: CustomerCreateMutationVariables},
  "#graphql\n  mutation customerUpdate($input: CustomerInput!) {\n    customerUpdate(input: $input) {\n      userErrors {\n        field\n        message\n      }\n      customer {\n        id\n        email\n        tags\n      }\n    }\n  }\n": {return: CustomerUpdateMutation, variables: CustomerUpdateMutationVariables},
  "#graphql\n  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n    metafieldsSet(metafields: $metafields) {\n      metafields {\n        namespace\n        key\n        value\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: MetafieldsSetMutation, variables: MetafieldsSetMutationVariables},
  "#graphql\n  mutation productVariantUpdate($input: ProductVariantInput!) {\n    productVariantUpdate(input: $input) {\n      product {\n        id\n      }\n      productVariant {\n        id\n        price\n        compareAtPrice\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: ProductVariantUpdateMutation, variables: ProductVariantUpdateMutationVariables},
  "#graphql\n  mutation tagsAdd($id: ID!, $tags: [String!]!) {\n    tagsAdd(id: $id, tags: $tags) {\n      node {\n        id\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: TagsAddMutation, variables: TagsAddMutationVariables},
  "#graphql\n  mutation tagsRemove($id: ID!, $tags: [String!]!) {\n    tagsRemove(id: $id, tags: $tags) {\n      node {\n        id\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }\n": {return: TagsRemoveMutation, variables: TagsRemoveMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
