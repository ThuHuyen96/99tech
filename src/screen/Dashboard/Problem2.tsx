import { Form, InputNumber, Select, Space } from "antd"
import { useGetListPrices } from "@/hook/useDashboard"
import _, { round } from "lodash"
import { useMemo, useState } from "react"
import { IPriceToken } from "@/types/Dashboard"

const { Option } = Select

export const Problem2 = () => {
  const [form] = Form.useForm()
  const { data: listPrice } = useGetListPrices()
  const [exchangeRate, setExchangeRate] = useState<null | number>(null)

  const listUnit = useMemo(() => {
    if (listPrice) {
      return _(listPrice)
        .groupBy("currency")
        .map((group) => _.orderBy(group, ["date"], ["desc"])[0])
        .value()
    }
    return []
  }, [listPrice])

  const handleSubmitSwap = (values: any) => {
    if (exchangeRate) {
      form.setFieldValue("total", values.amount * exchangeRate)
    }
  }

  const handleValuesChange = () => {
    const { fromCurrency, toCurrency, amount } = form.getFieldsValue()
    const from: any = listUnit.find((item: IPriceToken) => item.currency === fromCurrency)
    const to: any = listUnit.find((item: IPriceToken) => item.currency === toCurrency)
    if (fromCurrency && toCurrency && from && to) {
      setExchangeRate(round(from.price / to.price, 12))
      if (amount) form.setFieldValue("total", amount * round(from.price / to.price, 12))
    } else {
      setExchangeRate(null)
      form.setFieldValue("total", null)
    }
  }

  const prefixFromSelector = (
    <Form.Item
      name="fromCurrency"
      rules={[{ required: true, message: "Please select a currency" }]}
      noStyle>
      <Select
        placeholder="From Currency"
        className="w-[150px]">
        {listUnit.map((option: IPriceToken) => (
          <Option
            key={option.currency}
            value={option.currency}
            label={option.currency}>
            <Space className="item-select">
              <img
                src={`/tokens/${option.currency}.svg`}
                alt={option.currency}
                className="w-6 h-6 mr-2"
              />
              {option.currency}
            </Space>
          </Option>
        ))}
      </Select>
    </Form.Item>
  )

  const prefixToSelector = (
    <Form.Item
      name="toCurrency"
      rules={[{ required: true, message: "Please select a currency" }]}
      noStyle>
      <Select
        placeholder="To Currency"
        className="w-[150px]">
        {listUnit.map((option: IPriceToken) => (
          <Option
            key={option.currency}
            value={option.currency}
            label={option.currency}>
            <Space className="item-select">
              <img
                src={`/tokens/${option.currency}.svg`}
                alt={option.currency}
                className="w-6 h-6 mr-2"
              />
              {option.currency}
            </Space>
          </Option>
        ))}
      </Select>
    </Form.Item>
  )

  return (
    <div className="max-w-[600px]">
      <h3>Problem 2: Fancy Form</h3>
      <Form
        form={form}
        onFinish={handleSubmitSwap}
        onValuesChange={handleValuesChange}>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: "Please enter an amount" }]}>
          <InputNumber
            placeholder="Amount"
            min={0}
            addonBefore={prefixFromSelector}
            onChange={() => handleValuesChange()}
          />
        </Form.Item>
        <Form.Item name="total">
          <InputNumber
            addonBefore={prefixToSelector}
            readOnly={true}
          />
        </Form.Item>
      </Form>
      <p></p>
    </div>
  )
}
